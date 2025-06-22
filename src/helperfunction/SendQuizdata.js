// src/helperfunction/Finishedquiz.js
export const sendQuizdata = async ({ userId, questionTypes, exercise, language, points }) => {
    // Ensure questionTypes is always an array
    const URL = process.env.NEXT_PUBLIC_BACKENDURL
    const data = {
      userId,
      points: Number(points),
      exercise: Number(exercise),
      language,
      questionTypes: Array.isArray(questionTypes) ? questionTypes : [questionTypes],
    };
  
    try {
      console.log("Hi")
      const response = await fetch(`${URL}/api/updateScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  