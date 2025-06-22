// src/helperfunction/getUserData.js
export const Getperformance = async (userId) => {
  const URL = process.env.NEXT_PUBLIC_BACKENDURL
    try {
      const response = await fetch(`${URL}/api/${userId}/performance`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  