import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// --- Auth Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, // later you can include more user info (like completedQuizzes) here if needed
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Set cookie with 1-day expiration (6/24 day)
      Cookies.set("user", JSON.stringify(action.payload), { expires: 6 / 24, path: '/' });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove('user');
    },
    setUserFromCookies: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    updateCompletedQuizzes: (state, action) => {
      // The payload should be a quiz object containing:
      // { exercise, language, questionTypes } where questionTypes can be a string or an array
      if (state.user) {
        const newQuiz = action.payload;
        // Coerce exercise and language to strings for comparison
        const newExercise = String(newQuiz.exercise);
        const newLanguage = String(newQuiz.language);
        // Normalize questionTypes so that it's an array
        const newTypes = Array.isArray(newQuiz.questionTypes)
          ? newQuiz.questionTypes
          : [newQuiz.questionTypes];

        // Ensure completedQuizzes exists on user
        if (!state.user.completedQuizzes) {
          state.user.completedQuizzes = [];
        }

        // Find an existing quiz entry with the same exercise and language
        const existingQuiz = state.user.completedQuizzes.find(
          quiz =>
            String(quiz.exercise) === newExercise &&
            String(quiz.language) === newLanguage
        );

        if (existingQuiz) {
          // Merge new question types into the existing entry
          newTypes.forEach(qt => {
            if (!existingQuiz.questionTypes.includes(qt)) {
              existingQuiz.questionTypes.push(qt);
            }
          });
        } else {
          // If no matching entry exists, add the new quiz object
          state.user.completedQuizzes.push({
            exercise: newQuiz.exercise,
            language: newQuiz.language,
            questionTypes: newTypes,
          });
        }
      }
    },
  },
});

// --- FinishedQuizzes Slice ---
const finishedQuizzesSlice = createSlice({
  name: 'finishedQuizzes',
  initialState: {
    completedQuizzes:
      typeof window !== "undefined" && localStorage.getItem('completedQuizzes')
        ? JSON.parse(localStorage.getItem('completedQuizzes'))
        : [],
  },
  reducers: {
    addFinishedQuiz: (state, action) => {
      const { questionType, exercise, language } = action.payload;
      // Find existing entry for same exercise & language
      const existingEntry = state.completedQuizzes.find(
        quiz => quiz.exercise === exercise && quiz.language === language
      );

      if (existingEntry) {
        // Add the question type if it's not already present
        if (!existingEntry.questionTypes.includes(questionType)) {
          existingEntry.questionTypes.push(questionType);
        }
      } else {
        // Create a new quiz entry
        state.completedQuizzes.push({ 
          exercise, 
          language, 
          questionTypes: [questionType] 
        });
      }
      // Persist updated data to localStorage
      localStorage.setItem('completedQuizzes', JSON.stringify(state.completedQuizzes));
    },

    // In case you want to simply replace state from a payload:
    setFinishedQuizzesFromLocalStorage: (state, action) => {
      state.completedQuizzes = action.payload;
    },

    // Merge MongoDB data with the existing localStorage data
    mergeMongoAndLocalData: (state, action) => {
      // MongoDB data passed from your fetched user info (assumed to be an array)
      const mongoData = action.payload || [];
      // Data stored in localStorage
      const localData = typeof window !== "undefined" && localStorage.getItem('completedQuizzes')
        ? JSON.parse(localStorage.getItem('completedQuizzes'))
        : [];

      // Start with MongoDB data as the base
      let mergedData = [...mongoData];

      // Merge in any quizzes from localStorage that are missing in the MongoDB data
      localData.forEach(localQuiz => {
        const found = mergedData.find(
          quiz => quiz.exercise === localQuiz.exercise && quiz.language === localQuiz.language
        );
        if (found) {
          // If quiz exists, add any missing question types
          localQuiz.questionTypes.forEach(qType => {
            if (!found.questionTypes.includes(qType)) {
              found.questionTypes.push(qType);
            }
          });
        } else {
          // If not found, simply add the local quiz to the merged array
          mergedData.push(localQuiz);
        }
      });

      // Update the state and localStorage with the merged data
      state.completedQuizzes = mergedData;
      localStorage.setItem('completedQuizzes', JSON.stringify(mergedData));
    },
  },
});

// Unlocked Pages slice
const unlockedPagesSlice = createSlice({
  name: 'unlockedPages',
  initialState: {
    unlockedPagesFrench: typeof window !== "undefined" && localStorage.getItem('unlockedPagesFrench')
      ? JSON.parse(localStorage.getItem('unlockedPagesFrench'))
      : ["1","2","3","4","5"],
      unlockedPagesFrenchA2: typeof window !== "undefined" && localStorage.getItem('unlockedPagesFrenchA2')
      ? JSON.parse(localStorage.getItem('unlockedPagesFrenchA2'))
      : ["1","2","3","4","5"],
      unlockedPagesFrenchC1: typeof window !== "undefined" && localStorage.getItem('unlockedPagesFrenchC1')
      ? JSON.parse(localStorage.getItem('unlockedPagesFrenchC1'))
      : ["1","2","3","4","5"],
      unlockedPagesSpanishC1: typeof window !== "undefined" && localStorage.getItem('unlockedPagesSpanishC1')
      ? JSON.parse(localStorage.getItem('unlockedPagesSpanishC1'))
      : ["1","2","3","4","5"],
      unlockedPagesGermanC1: typeof window !== "undefined" && localStorage.getItem('unlockedPagesGermanC1')
      ? JSON.parse(localStorage.getItem('unlockedPagesGermanC1'))
      : ["1","2","3","4","5"],
      unlockedPagesEnglishB1: typeof window !== "undefined" && localStorage.getItem('unlockedPagesEnglishB1')
      ? JSON.parse(localStorage.getItem('unlockedPagesEnglishB1'))
      : ["1","2","3","4","5"],
      unlockedPagesEnglish: typeof window !== "undefined" && localStorage.getItem('unlockedPagesEnglish')
      ? JSON.parse(localStorage.getItem('unlockedPagesEnglish'))
      : ["1","2","3","4","5"],
    unlockedPagesFrenchB1: typeof window !== "undefined" && localStorage.getItem('unlockedPagesFrenchB1')
      ? JSON.parse(localStorage.getItem('unlockedPagesFrenchB1'))
      : ["1","2","3","4","5"],
    unlockedPagesSpanish: typeof window !== "undefined" && localStorage.getItem('unlockedPagesSpanish')
      ? JSON.parse(localStorage.getItem('unlockedPagesSpanish'))
      : ["1","2","3","4","5"],
      unlockedPagesSpanishA2: typeof window !== "undefined" && localStorage.getItem('unlockedPagesSpanishA2')
      ? JSON.parse(localStorage.getItem('unlockedPagesSpanishA2'))
      : ["1","2","3","4","5"],
    unlockedPagesGerman: typeof window !== "undefined" && localStorage.getItem('unlockedPagesGerman')
      ? JSON.parse(localStorage.getItem('unlockedPagesGerman'))
      : ["1","2","3","4","5"],
      unlockedPagesGermanA2: typeof window !== "undefined" && localStorage.getItem('unlockedPagesGermanA2')
      ? JSON.parse(localStorage.getItem('unlockedPagesGermanA2'))
      : ["1","2","3","4","5"],
    unlockedPagesItalian: typeof window !== "undefined" && localStorage.getItem('unlockedPagesItalian')
      ? JSON.parse(localStorage.getItem('unlockedPagesItalian'))
      : ["1","2","3","4","5"],
    unlockedPagesRussian: typeof window !== "undefined" && localStorage.getItem('unlockedPagesRussian')
      ? JSON.parse(localStorage.getItem('unlockedPagesRussian'))
      : ["1","2","3","4","5"],
    unlockedPagesDutch: typeof window !== "undefined" && localStorage.getItem('unlockedPagesDutch')
      ? JSON.parse(localStorage.getItem('unlockedPagesDutch'))
      : ["1","2","3","4","5"],
    unlockedPagesJapanese: typeof window !== "undefined" && localStorage.getItem('unlockedPagesJapanese')
      ? JSON.parse(localStorage.getItem('unlockedPagesJapanese'))
      : ["1","2","3","4","5"],
    unlockedPagesKorean: typeof window !== "undefined" && localStorage.getItem('unlockedPagesKorean')
      ? JSON.parse(localStorage.getItem('unlockedPagesKorean'))
      : ["1","2","3","4","5"],
    unlockedPagesDanish: typeof window !== "undefined" && localStorage.getItem('unlockedPagesDanish')
      ? JSON.parse(localStorage.getItem('unlockedPagesDanish'))
      : ["1","2","3","4","5"],
  },
  reducers: {
    unlockPage: (state, action) => {
      const { subject, pageId } = action.payload;
      let unlockedPages;

      switch (subject) {
        case 'French':
          unlockedPages = state.unlockedPagesFrench;
          if (!unlockedPages.includes(...pageId)) {
            state.unlockedPagesFrench.push(...pageId);
          }
          break;
          case 'FrenchC1':
            unlockedPages = state.unlockedPagesFrenchC1;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesFrenchC1.push(...pageId);
            }
            break;
            case 'GermanC1':
              unlockedPages = state.unlockedPagesGermanC1;
              if (!unlockedPages.includes(...pageId)) {
                state.unlockedPagesGermanC1.push(...pageId);
              }
              break;
              case 'SpanishC1':
                unlockedPages = state.unlockedPagesSpanishC1;
                if (!unlockedPages.includes(...pageId)) {
                  state.unlockedPagesSpanishC1.push(...pageId);
                }
                break;
                case 'EnglishB1':
                  unlockedPages = state.unlockedPagesEnglishB1;
                  if (!unlockedPages.includes(...pageId)) {
                    state.unlockedPagesEnglishB1.push(...pageId);
                  }
                  break;
          case 'FrenchA2':
            unlockedPages = state.unlockedPagesFrenchA2;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesFrenchA2.push(...pageId);
            }
            break;
          case 'English':
            unlockedPages = state.unlockedPagesEnglish;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesEnglish.push(...pageId);
            }
            break;
          case 'FrenchB1':
            unlockedPages = state.unlockedPagesFrenchB1;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesFrenchB1.push(...pageId);
            }
            break;
        case 'Spanish':
          unlockedPages = state.unlockedPagesSpanish;
          if (!unlockedPages.includes(...pageId)) {
            state.unlockedPagesSpanish.push(...pageId);
          }
          break;
          case 'SpanishA2':
            unlockedPages = state.unlockedPagesSpanishA2;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesSpanishA2.push(...pageId);
            }
            break;
        case 'German':
          unlockedPages = state.unlockedPagesGerman;
          if (!unlockedPages.includes(...pageId)) {
            state.unlockedPagesGerman.push(...pageId);
          }
          break;
          case 'GermanA2':
            unlockedPages = state.unlockedPagesGermanA2;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesGermanA2.push(...pageId);
            }
            break;
          case 'Italian':
            unlockedPages = state.unlockedPagesItalian;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesItalian.push(...pageId);
            }
            break;
            case 'Russian':
              unlockedPages = state.unlockedPagesRussian;
              if (!unlockedPages.includes(...pageId)) {
                state.unlockedPagesRussian.push(...pageId);
              }
              break;
              case 'Dutch':
                unlockedPages = state.unlockedPagesDutch;
                if (!unlockedPages.includes(...pageId)) {
                  state.unlockedPagesDutch.push(...pageId);
                }
                break;
        case 'Japanese':
            unlockedPages = state.unlockedPagesJapanese;
             if (!unlockedPages.includes(...pageId)) {
               state.unlockedPagesJapanese.push(...pageId);
             }
             break;
        case 'Korean':
           unlockedPages = state.unlockedPagesKorean;
            if (!unlockedPages.includes(...pageId)) {
              state.unlockedPagesKorean.push(...pageId);
            }
            break;
     case 'Danish':
         unlockedPages = state.unlockedPagesDanish;
           if (!unlockedPages.includes(...pageId)) {
             state.unlockedPagesDanish.push(...pageId);
           }
           break;
      }
    },
  },
});

// Lessons slice (similar to unlockedPagesSlice)
const lessonsSlice = createSlice({
  name: 'unlockedLessons',
  initialState: {
    unlockedLessonsFrench: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsFrench')
      ? JSON.parse(localStorage.getItem('unlockedLessonsFrench'))
      : ["1","2","3","4","5"],
      unlockedLessonsEnglishA1: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsEnglishA1')
      ? JSON.parse(localStorage.getItem('unlockedLessonsEnglishA1'))
      : ["1","2","3","4","5"],
      unlockedLessonsFrenchC1: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsFrenchC1')
      ? JSON.parse(localStorage.getItem('unlockedLessonsFrenchC1'))
      : ["1","2","3","4","5"],
      unlockedLessonsGermanC1: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsGermanC1')
      ? JSON.parse(localStorage.getItem('unlockedLessonsGermanC1'))
      : ["1","2","3","4","5"],
      unlockedLessonsSpanishC1: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsSpanishC1')
      ? JSON.parse(localStorage.getItem('unlockedLessonsSpanishC1'))
      : ["1","2","3","4","5"],
      unlockedLessonsFrenchA2: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsFrenchA2')
      ? JSON.parse(localStorage.getItem('unlockedLessonsFrenchA2'))
      : ["1","2","3","4","5"],
      unlockedLessonsEnglishB1: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsEnglishB1')
      ? JSON.parse(localStorage.getItem('unlockedLessonsEnglishB1'))
      : ["1","2","3","4","5"],
    unlockedLessonsFrenchB1: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsFrenchB1')
      ? JSON.parse(localStorage.getItem('unlockedLessonsFrenchB1'))
      : ["1","2","3","4","5"],
    unlockedLessonsSpanish: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsSpanish')
      ? JSON.parse(localStorage.getItem('unlockedLessonsSpanish'))
      : ["1","2","3","4","5"],
      unlockedLessonsSpanishA2: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsSpanishA2')
      ? JSON.parse(localStorage.getItem('unlockedLessonsSpanishA2'))
      : ["1","2","3","4","5"],
    unlockedLessonsGerman: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsGerman')
      ? JSON.parse(localStorage.getItem('unlockedLessonsGerman'))
      : ["1","2","3","4","5"],
      unlockedLessonsGermanA2: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsGermanA2')
      ? JSON.parse(localStorage.getItem('unlockedLessonsGermanA2'))
      : ["1","2","3","4","5"],
      unlockedLessonsMultilingual: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsMultilingual')
      ? JSON.parse(localStorage.getItem('unlockedLessonsMultilingual'))
      : ["1","2","3","4","5"],
      unlockedLessonsItalian: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsItalian')
      ? JSON.parse(localStorage.getItem('unlockedLessonsItalian'))
      : ["1","2","3","4","5"],
      unlockedLessonsRussian: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsRussian')
      ? JSON.parse(localStorage.getItem('unlockedLessonsRussian'))
      : ["1","2","3","4","5"],
      unlockedLessonsDutch: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsDutch')
      ? JSON.parse(localStorage.getItem('unlockedLessonsDutch'))
      : ["1","2","3","4","5"],
      unlockedLessonsJapanese: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsJapanese')
      ? JSON.parse(localStorage.getItem('unlockedLessonsJapanese'))
      : ["1","2","3","4","5"],
      unlockedLessonsKorean: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsKorean')
      ? JSON.parse(localStorage.getItem('unlockedLessonsKorean'))
      : ["1","2","3","4","5"],
      unlockedLessonsDanish: typeof window !== "undefined" && localStorage.getItem('unlockedLessonsDanish')
      ? JSON.parse(localStorage.getItem('unlockedLessonsDanish'))
      : ["1","2","3","4","5"],
  },
  reducers: {
    unlockLesson: (state, action) => {
      const { subject, lessonId } = action.payload;
      let unlockedLessons;

      switch (subject) {
        case 'French':
          unlockedLessons = state.unlockedLessonsFrench;
          if (!unlockedLessons.includes(...lessonId)) {
            state.unlockedLessonsFrench.push(...lessonId);
          }
          break;
          case 'FrenchC1':
            unlockedLessons = state.unlockedLessonsFrenchC1;
            if (!unlockedLessons.includes(...lessonId)) {
              state.unlockedLessonsFrenchC1.push(...lessonId);
            }
            break;
            case 'EnglishC1':
              unlockedLessons = state.unlockedLessonsEnglishA1;
              if (!unlockedLessons.includes(...lessonId)) {
                state.unlockedLessonsEnglishA1.push(...lessonId);
              }
              break;
              case 'GermanC1':
                unlockedLessons = state.unlockedLessonsGermanC1;
                if (!unlockedLessons.includes(...lessonId)) {
                  state.unlockedLessonsGermanC1.push(...lessonId);
                }
                break;
                case 'SpanishC1':
                  unlockedLessons = state.unlockedLessonsSpanishC1;
                  if (!unlockedLessons.includes(...lessonId)) {
                    state.unlockedLessonsSpanishC1.push(...lessonId);
                  }
                  break;
          case 'EnglishB1':
            unlockedLessons = state.unlockedLessonsEnglishB1;
            if (!unlockedLessons.includes(...lessonId)) {
              state.unlockedLessonsEnglishB1.push(...lessonId);
            }
            break;
          case 'FrenchB1':
            unlockedLessons = state.unlockedLessonsFrenchB1;
            if (!unlockedLessons.includes(...lessonId)) {
              state.unlockedLessonsFrenchB1.push(...lessonId);
            }
            break;
        case 'Spanish':
          unlockedLessons = state.unlockedLessonsSpanish;
          if (!unlockedLessons.includes(...lessonId)) {
            state.unlockedLessonsSpanish.push(...lessonId);
          }
          break;
        case 'German':
          unlockedLessons = state.unlockedLessonsGerman;
          if (!unlockedLessons.includes(...lessonId)) {
            state.unlockedLessonsGerman.push(...lessonId);
          }
          break;
          case 'Multilingual':
            unlockedLessons = state.unlockedLessonsMultilingual;
            if (!unlockedLessons.includes(...lessonId)) {
              state.unlockedLessonsMultilingual.push(...lessonId);
            }
            break;
        case 'Italian':
          unlockedLessons = state.unlockedLessonsItalian;
           if (!unlockedLessons.includes(...lessonId)) {
             state.unlockedLessonsItalian.push(...lessonId);
            }
           break;
        case 'Russian':
          unlockedLessons = state.unlockedLessonsRussian;
           if (!unlockedLessons.includes(...lessonId)) {
             state.unlockedLessonsRussian.push(...lessonId);
            }
           break;
        case 'Dutch':
          unlockedLessons = state.unlockedLessonsDutch;
           if (!unlockedLessons.includes(...lessonId)) {
             state.unlockedLessonsDutch.push(...lessonId);
            }
           break;
           case 'Japanese':
            unlockedLessons = state.unlockedLessonsJapanese;
             if (!unlockedLessons.includes(...lessonId)) {
               state.unlockedLessonsJapanese.push(...lessonId);
              }
             break;
             case 'Korean':
              unlockedLessons = state.unlockedLessonsKorean;
               if (!unlockedLessons.includes(...lessonId)) {
                 state.unlockedLessonsKorean.push(...lessonId);
                }
               break;
               case 'Danish':
                unlockedLessons = state.unlockedLessonsDanish;
                 if (!unlockedLessons.includes(...lessonId)) {
                   state.unlockedLessonsDanish.push(...lessonId);
                  }
                 break;
      }
    },
  },
});

const AssignmentsSlice = createSlice({
  name: 'unlockedAssignments',
  initialState: {
    unlockedAssignmentsFrench: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsFrench')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsFrench'))
      : ["1","2","3","4","5"],
      unlockedAssignmentsFrenchC1: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsFrenchC1')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsFrenchC1'))
      : ["1","2","3","4","5"],
      unlockedAssignmentsGermanC1: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsGermanC1')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsGermanC1'))
      : ["1","2","3","4","5"],
      unlockedAssignmentsSpanishC1: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsSpanishC1')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsSpanishC1'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsEnglish: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsEnglish')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsEnglish'))
      : ["1","2","3","4","5"],
      unlockedAssignmentsEnglishB1: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsEnglishB1')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsEnglishB1'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsFrenchB1: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsFrenchB1')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsFrenchB1'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsSpanish: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsSpanish')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsSpanish'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsGerman: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsGerman')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsGerman'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsItalian: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsItalian')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsItalian'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsRussian: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsRussian')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsRussian'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsDutch: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsDutch')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsDutch'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsJapanese: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsJapanese')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsJapanese'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsKorean: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsKorean')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsKorean'))
      : ["1","2","3","4","5"],
    unlockedAssignmentsDanish: typeof window !== "undefined" && localStorage.getItem('unlockedAssignmentsDanish')
      ? JSON.parse(localStorage.getItem('unlockedAssignmentsDanish'))
      : ["1","2","3","4","5"],
  },
  reducers: {
    unlockAssignments: (state, action) => {
      const { subject, lessonId } = action.payload;
      let unlockedAssignments;

      switch (subject) {
        case 'French':
          unlockedAssignments = state.unlockedAssignmentsFrench;
          if (!unlockedAssignments.includes(...lessonId)) {
            state.unlockedAssignmentsFrench.push(...lessonId);
          }
          break;
          case 'FrenchC1':
            unlockedAssignments = state.unlockedAssignmentsFrenchC1;
            if (!unlockedAssignments.includes(...lessonId)) {
              state.unlockedAssignmentsFrenchC1.push(...lessonId);
            }
            break;
            case 'SpanishC1':
              unlockedAssignments = state.unlockedAssignmentsSpanishC1;
              if (!unlockedAssignments.includes(...lessonId)) {
                state.unlockedAssignmentsSpanishC1.push(...lessonId);
              }
              break;
              case 'GermanC1':
                unlockedAssignments = state.unlockedAssignmentsGermanC1;
                if (!unlockedAssignments.includes(...lessonId)) {
                  state.unlockedAssignmentsGermanC1.push(...lessonId);
                }
                break;
          case 'English':
            unlockedAssignments = state.unlockedAssignmentsEnglish;
            if (!unlockedAssignments.includes(...lessonId)) {
              state.unlockedAssignmentsEnglish.push(...lessonId);
            }
            break;
            case 'EnglishB1':
              unlockedAssignments = state.unlockedAssignmentsEnglishB1;
              if (!unlockedAssignments.includes(...lessonId)) {
                state.unlockedAssignmentsEnglishB1.push(...lessonId);
              }
              break;
        case 'FrenchB1':
            unlockedAssignments = state.unlockedAssignmentsFrenchB1;
            if (!unlockedAssignments.includes(...lessonId)) {
              state.unlockedAssignmentsFrenchB1.push(...lessonId);
            }
            break;
        case 'Spanish':
          unlockedAssignments = state.unlockedAssignmentsSpanish;
          if (!unlockedAssignments.includes(...lessonId)) {
            state.unlockedAssignmentsSpanish.push(...lessonId);
          }
          break;
        case 'German':
          unlockedAssignments = state.unlockedAssignmentsGerman;
          if (!unlockedAssignments.includes(...lessonId)) {
            state.unlockedAssignmentsGerman.push(...lessonId);
          }
          break;
        case 'Italian':
            unlockedAssignments = state.unlockedAssignmentsItalian;
            if (!unlockedAssignments.includes(...lessonId)) {
              state.unlockedAssignmentsItalian.push(...lessonId);
            }
            break;
        case 'Russian':
             unlockedAssignments = state.unlockedAssignmentsRussian;
             if (!unlockedAssignments.includes(...lessonId)) {
               state.unlockedAssignmentsRussian.push(...lessonId);
             }
             break;
        case 'Dutch':
            unlockedAssignments = state.unlockedAssignmentsDutch;
             if (!unlockedAssignments.includes(...lessonId)) {
               state.unlockedAssignmentsDutch.push(...lessonId);
             }
             break;
             case 'Japanese':
              unlockedAssignments = state.unlockedAssignmentsJapanese;
               if (!unlockedAssignments.includes(...lessonId)) {
                 state.unlockedAssignmentsJapanese.push(...lessonId);
               }
               break;
               case 'Korean':
                unlockedAssignments = state.unlockedAssignmentsKorean;
                 if (!unlockedAssignments.includes(...lessonId)) {
                   state.unlockedAssignmentsKorean.push(...lessonId);
                 }
                 break;
                 case 'Danish':
                  unlockedAssignments = state.unlockedAssignmentsDanish;
                   if (!unlockedAssignments.includes(...lessonId)) {
                     state.unlockedAssignmentsDanish.push(...lessonId);
                   }
                   break;
      }
    },
  },
});

// Exercises slice (similar to unlockedPagesSlice)
const exercisesSlice = createSlice({
  name: 'unlockedExercises',
  initialState: {
    unlockedExercisesFrench: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesFrench')
      ? JSON.parse(localStorage.getItem('unlockedExercisesFrench'))
      : ["1","2","3","4","5"],
      unlockedExercisesFrenchA2: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesFrenchA2')
      ? JSON.parse(localStorage.getItem('unlockedExercisesFrenchA2'))
      : ["1","2","3","4","5"],
      unlockedExercisesEnglishB1: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesEnglishB1')
      ? JSON.parse(localStorage.getItem('unlockedExercisesEnglishB1'))
      : ["1","2","3","4","5"],
    unlockedExercisesFrenchB1: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesFrenchB1')
      ? JSON.parse(localStorage.getItem('unlockedExercisesFrenchB1'))
      : ["1","2","3","4","5"],
    unlockedExercisesSpanish: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesSpanish')
      ? JSON.parse(localStorage.getItem('unlockedExercisesSpanish'))
      : ["1","2","3","4","5"],
      unlockedExercisesSpanishA2: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesSpanishA2')
      ? JSON.parse(localStorage.getItem('unlockedExercisesSpanishA2'))
      : ["1","2","3","4","5"],
    unlockedExercisesGerman: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesGerman')
      ? JSON.parse(localStorage.getItem('unlockedExercisesGerman'))
      : ["1","2","3","4","5"],
      unlockedExercisesGermanA2: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesGermanA2')
      ? JSON.parse(localStorage.getItem('unlockedExercisesGermanA2'))
      : ["1","2","3","4","5"],
      unlockedExercisesItalian: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesItalian')
      ? JSON.parse(localStorage.getItem('unlockedExercisesItalian'))
      : ["1","2","3","4","5"],
      unlockedExercisesRussian: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesRussian')
      ? JSON.parse(localStorage.getItem('unlockedExercisesRussian'))
      : ["1","2","3","4","5"],
      unlockedExercisesDutch: typeof window !== "undefined" && localStorage.getItem('unlockedExercisesDutch')
      ? JSON.parse(localStorage.getItem('unlockedExercisesDutch'))
      : ["1","2","3","4","5"],
  },
  reducers: {
    unlockExercise: (state, action) => {
      const { subject, exerciseId } = action.payload;
      let unlockedExercises;

      switch (subject) {
        case 'French':
          unlockedExercises = state.unlockedExercisesFrench;
          if (!unlockedExercises.includes(...exerciseId)) {
            state.unlockedExercisesFrench.push(...exerciseId);
          }
          break;
          case 'FrenchA2':
            unlockedExercises = state.unlockedExercisesFrench;
            if (!unlockedExercises.includes(...exerciseId)) {
              state.unlockedExercisesFrench.push(...exerciseId);
            }
            break;
          case 'EnglishB1':
            unlockedExercises = state.unlockedExercisesEnglishB1;
            if (!unlockedExercises.includes(...exerciseId)) {
              state.unlockedExercisesEnglishB1.push(...exerciseId);
            }
            break;
          case 'FrenchB1':
            unlockedExercises = state.unlockedExercisesFrenchB1;
            if (!unlockedExercises.includes(...exerciseId)) {
              state.unlockedExercisesFrenchB1.push(...exerciseId);
            }
            break;
        case 'Spanish':
          unlockedExercises = state.unlockedExercisesSpanish;
          if (!unlockedExercises.includes(...exerciseId)) {
            state.unlockedExercisesSpanish.push(...exerciseId);
          }
          break;
          case 'SpanishA2':
            unlockedExercises = state.unlockedExercisesSpanishA2;
            if (!unlockedExercises.includes(...exerciseId)) {
              state.unlockedExercisesSpanishA2.push(...exerciseId);
            }
            break;
        case 'German':
          unlockedExercises = state.unlockedExercisesGerman;
          if (!unlockedExercises.includes(...exerciseId)) {
            state.unlockedExercisesGerman.push(...exerciseId);
          }
          break;
          case 'GermanA2':
            unlockedExercises = state.unlockedExercisesGermanA2;
            if (!unlockedExercises.includes(...exerciseId)) {
              state.unlockedExercisesGermanA2.push(...exerciseId);
            }
            break;
          case 'Italian':
            unlockedExercises = state.unlockedExercisesItalian;
            if (!unlockedExercises.includes(...exerciseId)) {
              state.unlockedExercisesItalian.push(...exerciseId);
            }
            break;
            case 'Russian':
              unlockedExercises = state.unlockedExercisesRussian;
              if (!unlockedExercises.includes(...exerciseId)) {
                state.unlockedExercisesRussian.push(...exerciseId);
              }
              break;
              case 'Dutch':
                unlockedExercises = state.unlockedExercisesDutch;
                if (!unlockedExercises.includes(...exerciseId)) {
                  state.unlockedExercisesDutch.push(...exerciseId);
                }
                break;
      }
    },
  },
});

// Exporting the actions from the slices
export const { login, logout, setUserFromCookies, updateCompletedQuizzes } = authSlice.actions;
export const { unlockPage } = unlockedPagesSlice.actions;
export const { unlockLesson } = lessonsSlice.actions;
export const { unlockAssignments } = AssignmentsSlice.actions;
export const { unlockExercise } = exercisesSlice.actions;
export const { addFinishedQuiz, setFinishedQuizzesFromLocalStorage, mergeMongoAndLocalData } = finishedQuizzesSlice.actions;

// Configure the store with the slices
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    unlockedPages: unlockedPagesSlice.reducer,
    unlockedLessons: lessonsSlice.reducer,
    unlockedAssignments: AssignmentsSlice.reducer,
    unlockedExercises: exercisesSlice.reducer,
    finishedQuizzes: finishedQuizzesSlice.reducer,
  },
});

// Sync unlocked pages, lessons, and exercises with localStorage
store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('completedQuizzes', JSON.stringify(state.finishedQuizzes.completedQuizzes));

  localStorage.setItem('unlockedPagesFrench', JSON.stringify(state.unlockedPages.unlockedPagesFrench));
  localStorage.setItem('unlockedPagesFrenchC1', JSON.stringify(state.unlockedPages.unlockedPagesFrenchC1));
  localStorage.setItem('unlockedPagesGermanC1', JSON.stringify(state.unlockedPages.unlockedPagesGermanC1));
  localStorage.setItem('unlockedPagesSpanishC1', JSON.stringify(state.unlockedPages.unlockedPagesSpanishC1));
  localStorage.setItem('unlockedPagesEnglishB1', JSON.stringify(state.unlockedPages.unlockedPagesEnglishB1));
  localStorage.setItem('unlockedPagesFrenchA2', JSON.stringify(state.unlockedPages.unlockedPagesFrenchA2));
  localStorage.setItem('unlockedPagesEnglish', JSON.stringify(state.unlockedPages.unlockedPagesEnglish));
  localStorage.setItem('unlockedPagesFrenchB1', JSON.stringify(state.unlockedPages.unlockedPagesFrenchB1));
  localStorage.setItem('unlockedPagesSpanish', JSON.stringify(state.unlockedPages.unlockedPagesSpanish));
  localStorage.setItem('unlockedPagesSpanishA2', JSON.stringify(state.unlockedPages.unlockedPagesSpanishA2));
  localStorage.setItem('unlockedPagesGerman', JSON.stringify(state.unlockedPages.unlockedPagesGerman));
  localStorage.setItem('unlockedPagesGermanA2', JSON.stringify(state.unlockedPages.unlockedPagesGermanA2));
  localStorage.setItem('unlockedPagesItalian', JSON.stringify(state.unlockedPages.unlockedPagesItalian));
  localStorage.setItem('unlockedPagesRussian', JSON.stringify(state.unlockedPages.unlockedPagesRussian));
  localStorage.setItem('unlockedPagesDutch', JSON.stringify(state.unlockedPages.unlockedPagesDutch));
  localStorage.setItem('unlockedPagesJapanese', JSON.stringify(state.unlockedPages.unlockedPagesJapanese));
  localStorage.setItem('unlockedPagesKorean', JSON.stringify(state.unlockedPages.unlockedPagesKorean));
  localStorage.setItem('unlockedPagesDanish', JSON.stringify(state.unlockedPages.unlockedPagesDanish));

  localStorage.setItem('unlockedLessonsFrench', JSON.stringify(state.unlockedLessons.unlockedLessonsFrench));
  localStorage.setItem('unlockedLessonsFrenchC1', JSON.stringify(state.unlockedLessons.unlockedLessonsFrenchC1));
  localStorage.setItem('unlockedLessonsEnglishA1', JSON.stringify(state.unlockedLessons.unlockedLessonsEnglishA1));
  localStorage.setItem('unlockedLessonsSpanishC1', JSON.stringify(state.unlockedLessons.unlockedLessonsSpanishC1));
  localStorage.setItem('unlockedLessonsGermanC1', JSON.stringify(state.unlockedLessons.unlockedLessonsGermanC1));
  localStorage.setItem('unlockedLessonsFrenchA2', JSON.stringify(state.unlockedLessons.unlockedLessonsFrenchA2));
  localStorage.setItem('unlockedLessonsEnglishB1', JSON.stringify(state.unlockedLessons.unlockedLessonsEnglishB1));
  localStorage.setItem('unlockedLessonsFrenchB1', JSON.stringify(state.unlockedLessons.unlockedLessonsFrenchB1));
  localStorage.setItem('unlockedLessonsSpanish', JSON.stringify(state.unlockedLessons.unlockedLessonsSpanish));
  localStorage.setItem('unlockedLessonsSpanishA2', JSON.stringify(state.unlockedLessons.unlockedLessonsSpanishA2));
  localStorage.setItem('unlockedLessonsGerman', JSON.stringify(state.unlockedLessons.unlockedLessonsGerman));
  localStorage.setItem('unlockedLessonsGermanA2', JSON.stringify(state.unlockedLessons.unlockedLessonsGermanA2));
  localStorage.setItem('unlockedLessonsItalian', JSON.stringify(state.unlockedLessons.unlockedLessonsItalian));
  localStorage.setItem('unlockedLessonsRussian', JSON.stringify(state.unlockedLessons.unlockedLessonsRussian));
  localStorage.setItem('unlockedLessonsDutch', JSON.stringify(state.unlockedLessons.unlockedLessonsDutch));
  localStorage.setItem('unlockedLessonsJapanese', JSON.stringify(state.unlockedLessons.unlockedLessonsJapanese));
  localStorage.setItem('unlockedLessonsKorean', JSON.stringify(state.unlockedLessons.unlockedLessonsKorean));
  localStorage.setItem('unlockedLessonsDanish', JSON.stringify(state.unlockedLessons.unlockedLessonsDanish));
  localStorage.setItem('unlockedLessonsMultilingual', JSON.stringify(state.unlockedLessons.unlockedLessonsMultilingual));

  localStorage.setItem('unlockedAssignmentsFrench', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsFrench));
  localStorage.setItem('unlockedAssignmentsFrenchC1', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsFrenchC1));
  localStorage.setItem('unlockedAssignmentsGermanC1', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsGermanC1));
  localStorage.setItem('unlockedAssignmentsSpanishC1', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsSpanishC1));
  localStorage.setItem('unlockedAssignmentsEnglish', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsEnglish));
  localStorage.setItem('unlockedAssignmentsEnglishB1', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsEnglishB1));
  localStorage.setItem('unlockedAssignmentsFrenchB1', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsFrenchB1));
  localStorage.setItem('unlockedAssignmentsSpanish', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsSpanish));
  localStorage.setItem('unlockedAssignmentsGerman', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsGerman));
  localStorage.setItem('unlockedAssignmentsItalian', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsItalian));
  localStorage.setItem('unlockedAssignmentsRussian', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsRussian));
  localStorage.setItem('unlockedAssignmentsDutch', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsDutch));
  localStorage.setItem('unlockedAssignmentsJapanese', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsJapanese));
  localStorage.setItem('unlockedAssignmentsKorean', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsKorean));
  localStorage.setItem('unlockedAssignmentsDanish', JSON.stringify(state.unlockedAssignments.unlockedAssignmentsDanish));

  localStorage.setItem('unlockedExercisesFrench', JSON.stringify(state.unlockedExercises.unlockedExercisesFrench));
  localStorage.setItem('unlockedExercisesFrenchA2', JSON.stringify(state.unlockedExercises.unlockedExercisesFrenchA2));
  localStorage.setItem('unlockedExercisesEnglishB1', JSON.stringify(state.unlockedExercises.unlockedExercisesEnglishB1));
  localStorage.setItem('unlockedExercisesFrenchB1', JSON.stringify(state.unlockedExercises.unlockedExercisesFrenchB1));
  localStorage.setItem('unlockedExercisesSpanish', JSON.stringify(state.unlockedExercises.unlockedExercisesSpanish));
  localStorage.setItem('unlockedExercisesSpanishA2', JSON.stringify(state.unlockedExercises.unlockedExercisesSpanishA2));
  localStorage.setItem('unlockedExercisesGerman', JSON.stringify(state.unlockedExercises.unlockedExercisesGerman));
  localStorage.setItem('unlockedExercisesGermanA2', JSON.stringify(state.unlockedExercises.unlockedExercisesGermanA2));
  localStorage.setItem('unlockedExercisesItalian', JSON.stringify(state.unlockedExercises.unlockedExercisesItalian));
  localStorage.setItem('unlockedExercisesRussian', JSON.stringify(state.unlockedExercises.unlockedExercisesRussian));
  localStorage.setItem('unlockedExercisesDutch', JSON.stringify(state.unlockedExercises.unlockedExercisesDutch));
});
