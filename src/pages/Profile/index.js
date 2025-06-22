import React, { useEffect, useMemo, useRef, useState } from 'react';
import Left from '../../../components/Profile/left';
import styles from './Profile.module.css';
import LoadingSpinner from '../../../components/loader';
import {cards} from '../../helperfunction/fetchalldatajson'
import { useSelector } from 'react-redux';
import Right from '../../../components/Profile/Right';
import { Getperformance } from '@/helperfunction/Getperformance';
import Navbar from '../../../components/NavbarJS'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const languages = {'french':'French A1', 'frencha2': 'French A2', 'frenchb1': 'French B1', 'frenchb2': 'French B2', 'spanish' :'Spanish A1','spanisha2': 'Spanish A2', 'spanish b1': 'Spanish B1', 'germana1':'German A1', 'germana2':'German A2', 'germanb1':'German B1', 'germanb2':'German B2'}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const exercisesgroup = {
"French A1": ["French", "FrenchRA", "FrenchLA", "FrenchRP", "FrenchWP", "FrenchPT"], 
"French A2": ["FrenchA2", "FrenchA2RA", "FrenchA2LA", "FrenchA2RP", "FrenchA2WP", "FrenchA2PT"], 
"French B1": ["FrenchB1", "FrenchB1RA", "FrenchB1LA", "FrenchB1RP", "FrenchB1WP", "FrenchB1PT"],
"French B2": ["FrenchB2", "FrenchB2RA", "FrenchB2LA", "FrenchB2RP", "FrenchB2WP", "FrenchB2PT"],
"Spanish A1": ["Spanish", "SpanishRA", "SpanishLA", "SpanishRP", "SpanishWP", "SpanishPT"],
"Spanish A2": ["SpanishA2", "SpanishA2RA", "SpanishA2LA", "SpanishA2RP", "SpanishA2WP", "SpanishA2PT"],
"Spanish B1": ["SpanishB1", "SpanishB1RA", "SpanishB1LA", "SpanishB1RP", "SpanishB1WP", "SpanishB1PT"],
"German A1": ["German", "GermanRA", "GermanLA", "GermanRP", "GermanWP", "GermanPT"],
"German A2": ["GermanA2", "GermanA2RA", "GermanA2LA", "GermanA2RP", "GermanA2WP", "GermanA2PT"],
"German B1": ["GermanB1", "GermanB1RA", "GermanB1LA", "GermanB1RP", "GermanB1WP", "GermanB1PT"],
}

const calculateStreak = (dailyScores) => {
  const dates = Object.keys(dailyScores).sort(); // Get all dates and sort them
  let streak = 0;
  let currentStreak = 0;

  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const previousDate = new Date(dates[i - 1]);

    // Check if the current date is consecutive to the previous date
    if (i === 0 || (currentDate - previousDate === 86400000)) { // 86400000 ms = 1 day
      currentStreak++;
      streak = Math.max(streak, currentStreak);
    } else {
      currentStreak = 1; // Reset streak if not consecutive
    }
  }

  return streak;
};

const getThisWeeksScores = (dailyScores) => {
  const today = new Date();
  const startOfWeek = new Date(today); // Clone today's date
  startOfWeek.setDate(today.getDate() - today.getDay()); // Set to the start of the week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight

  const endOfWeek = new Date(startOfWeek); // Clone startOfWeek
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the end of the week (Saturday)
  endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

  const thisWeeksScores = {};

  Object.entries(dailyScores).forEach(([date, score]) => {
    const currentDate = new Date(date);

    // Check if the date is within this week
    if (currentDate >= startOfWeek && currentDate <= endOfWeek) {
      const dayName = daysOfWeek[currentDate.getDay()]; // Get the day name (e.g., "Monday")
      thisWeeksScores[dayName] = (thisWeeksScores[dayName] || 0) + score; // Add the score for the day
    }
  });

  // Ensure all days of the week are present in the result, even if they have no scores
  daysOfWeek.forEach((day) => {
    if (!thisWeeksScores[day]) {
      thisWeeksScores[day] = 0; // Default to 0 if no score exists for the day
    }
  });

  return thisWeeksScores;
};

const calculateBestAndAverage = (scores) => {
  const values = Object.values(scores); // Extract all score values
  if (values.length === 0) return { best: 0, average: 0 }; // Handle empty scores

  const best = Math.max(...values); // Find the highest score
  const average = values.reduce((sum, score) => sum + score, 0) / values.length; // Calculate the average

  return { best, average };
};

export default function index() {
      const [ loading, setLoading ] = useState(false)
      const { user } = useSelector((state) => state.auth);
      const [selection, setSelection] = useState({ section: null, language: 'SAT' });
      const [userData, setUserData] = useState(null);
      const [streak, setStreak] = useState(0);
      const [thisWeeksScores, setThisWeeksScores] = useState({});
      const [lesson, setLesson] = useState({})
      const [error, setError] = useState(null);
      const [totalScores, setTotalScores] = useState([]);
      const [userRank, setUserRank] = useState(null);
      const [dailyScores, setDailyScores] = useState([]);
      const [weeklyScores, setWeeklyScores] = useState([]);
      const [monthlyScores, setMonthlyScores] = useState([]);
      const [weeklyBest, setWeeklyBest] = useState(0);
      const [weeklyAverage, setWeeklyAverage] = useState(0);
      const [monthlyBest, setMonthlyBest] = useState(0);
      const [monthlyAverage, setMonthlyAverage] = useState(0);
      const URL = process.env.NEXT_PUBLIC_BACKENDURL
      const value = selection.language;
      const key = Object.keys(languages).find(key => languages[key] === value);
      const card = cards.find(c => c.code === key);
      const sections = useMemo(() => (["Exercises", "Reading", "Listening", "ReadingP", "Writing", "PracticeTest"]), []);
      const [filteredObject, setFilteredObject] = useState({});
       const sectionRef = useRef();
const uniqueExerciseCount = userData?.completedExercises
  ? new Set(userData.completedExercises.map(ex => ex.exercise)).size
  : 0;

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const data = await Getperformance(user.userId);
            setUserData(data);
          } catch (err) {
            console.error(err);
            setError("Failed to load user data");
          }
        };
    
        fetchUserData();
      }, [user?.userId]);

      useEffect(() => {
        if (!exercisesgroup[selection.language]) return;
      
        // Ensure exercisesgroup[selection.language] is an array
        const exerciseList = Array.isArray(exercisesgroup[selection.language]) ? exercisesgroup[selection.language] : [];
      
        // Create an object where each language is a key and its value is an array of unique matching entries
        const newFilteredObject = {};
      
        exerciseList.forEach(language => {
          // Use a Set to track unique exercises
          const seenExercises = new Set();
      
          // Filter completed exercises for this specific language and ensure uniqueness
          const matchingExercises = userData?.completedExercises.filter(data => {
            if (data.language === language && !seenExercises.has(data.exercise)) {
              seenExercises.add(data.exercise);
              return true;
            }
            return false;
          });
      
          // Only add to the object if there are matches
          if (matchingExercises?.length > 0) {
            newFilteredObject[language] = matchingExercises;
          }
        });
      
        setFilteredObject(newFilteredObject);
      }, [userData?.completedExercises, exercisesgroup, selection.language]);
      
      

      useEffect(() => {
        async function fetchAllLessons() {
          const newLesson = {};
          await Promise.all(
            sections.map(async (section) => {
              const sectionInfo = card[section];
              if (sectionInfo && sectionInfo.file) {
                try {
                  // Adjust file extension if necessary (e.g., .js)
                  const module = await import(`../../Data/${sectionInfo.folder}/${sectionInfo.file}.js`);
                  newLesson[section] = module[sectionInfo.array];
                } catch (error) {
                  console.error(`Error loading ${section} data:`, error);
                  newLesson[section] = null;
                }
              } else {
                newLesson[section] = null;
              }
            })
          );
          setLesson(newLesson);
        }
        
        if (card) {
          fetchAllLessons();
        }
      }, [card, sections]);

        // Fetch totalScores from the backend
  useEffect(() => {
    const fetchTotalScores = async () => {
      try {
        const response = await fetch(`${URL}/api/users/totalScores`);
        const data = await response.json();
        if (data.success) {
          const sortedScores = data.users.sort((a, b) => b.performance.totalScore - a.performance.totalScore);
          setTotalScores(sortedScores);

           // Find the rank of the current user
           const rank = sortedScores?.findIndex((score) => score.userId === user.userId) + 1;
           setUserRank(rank); // Store the user's rank
        } else {
          console.error("Failed to fetch totalScores:", data.message);
        }
      } catch (error) {
        console.error("Error fetching totalScores:", error);
      }
    };

    fetchTotalScores();
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`${URL}/api/${user.userId}/scores`);
        const data = await response.json();
        if (data.success) {
          setDailyScores(data.dailyScores);
          setWeeklyScores(data.weeklyScores);
          setMonthlyScores(data.monthlyScores);

        // Calculate streak from dailyScores
        const calculatedStreak = calculateStreak(data.dailyScores);
        setStreak(calculatedStreak);

        // Calculate this week's scores
        const weeklyScores = getThisWeeksScores(data.dailyScores);
        setThisWeeksScores(weeklyScores);

          // Calculate weekly best and average
          const { best: weeklyBest, average: weeklyAverage } = calculateBestAndAverage(data.weeklyScores);
          setWeeklyBest(weeklyBest);
          setWeeklyAverage(weeklyAverage);

          // Calculate monthly best and average
          const { best: monthlyBest, average: monthlyAverage } = calculateBestAndAverage(data.monthlyScores);
          setMonthlyBest(monthlyBest);
          setMonthlyAverage(monthlyAverage);
        } else {
          console.error("Failed to fetch scores:", data.message);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [user?.userId]);

  const handleLanguageSelection = (section, language) => {
    setSelection({ section, language });
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

const handleDownload = async () => {
  // Get the element to capture
  const input = sectionRef.current;

  // Capture the content as a canvas using html2canvas
  const canvas = await html2canvas(input, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Path for your logo image
  const logoPath = "/newlogo1.png"; // Ensure this path is correct

  // Create a new PDF document: A4 size, portrait, in millimeters
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Add the logo at the top left (for example at x=10, y=10 with width=40, height=40)
  pdf.addImage(logoPath, "PNG", 10, 10, 15, 15);

  // Calculate dimensions for the captured content:
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // Set an offset to make sure the content is added below the logo. For instance, offset y by 60 mm.
  const yOffset = 30;
  pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, pdfHeight);

  // Save the generated PDF
  pdf.save('section.pdf');
};

    return (
      <>
          <Navbar />
        <div>
        {loading && <div className={styles.loader}><LoadingSpinner /></div>}
        <div className={styles.bigcontainer}>
          <div className={styles.heading}>
            <div>{user?.name}'s Profile</div>
            <div className={styles.flex11}> 
              <div className={styles.user} onClick={() => onLanguageSelect("SAT")}>Progress Report</div>
              <div className={styles.user} onClick={() => onLanguageSelect("Leader")}>Leaderboard</div>
              <div className={`${styles.flex12} ${styles.user}`} onClick={handleDownload}>Download Report</div>
              <div className={`${styles.flex12} ${styles.user}`} >Language: <span>{selection.language}</span></div>
            </div>
           
          </div>
          <div className={styles.container}>
            <div className={styles.righttext}>
              <Right 
              ref={sectionRef}
              selection={selection} 
              length={uniqueExerciseCount}
              lesson={lesson} 
              sections={sections} 
              filteredObject={filteredObject} 
              group={exercisesgroup[selection.language]} 
              userData={userData}
              userRank={userRank}
              totalScores={totalScores}
              streak={streak}
              thisWeeksScores={thisWeeksScores}
              weeklyBest={weeklyBest}
              weeklyAverage={weeklyAverage}
              monthlyBest={monthlyBest}
              monthlyAverage={monthlyAverage}/>
              <div>
</div>
            </div>
          </div>
        </div>
        </div>
        </>
      );
}
