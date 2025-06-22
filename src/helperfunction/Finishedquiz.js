// finishedQuizService.js

/**
 * Sends a new finished quiz (as an object) to the backend.
 * Note: Your backend must handle the case when completedQuizzes is a single object.
 *
 * @param {Object} params
 * @param {string} params.userId - The user's unique identifier.
 * @param {string} params.questionType - The type of question (e.g., "MCQs").
 * @param {string} params.exercise - The quiz/exercise ID.
 * @param {string} params.language - The language/subject.
 * @returns {Promise<Object>} - The response data from the backend.
 */
export async function addSingleFinishedQuizToServer({ userId, questionType, exercise, language }) {
    const URL = process.env.NEXT_PUBLIC_BACKENDURL; // Ensure this is set in your environment
    try {
      const response = await fetch(`${URL}/api/completed-quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Here we send the new finished quiz as a single object.
        body: JSON.stringify({
          userId,
          completedQuizzes: { questionTypes: [questionType], exercise, language },
        }),
      });
  
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Failed to update finished quiz");
      }
  
      return data;
    } catch (error) {
      console.error("Error in addSingleFinishedQuizToServer:", error);
      throw error;
    }
  }
  