// src/helperfunction/getAllSectionsData.js
import { cards } from "@/helperfunction/fetchalldatajson"; // Adjust this import as needed

export const getAllSectionsData = async (language) => {
  // Find the card that matches the provided language code
  const card = cards.find(c => c.code === language);
  if (!card) {
    throw new Error(`No card found for language: ${language}`);
  }

  // List of sections to load data for
  const sections = ["Exercises", "Reading", "Listening", "ReadingP", "Writing", "PracticeTest"];
  
  // Object to store the imported data for each section
  const dataObj = {};

  await Promise.all(
    sections.map(async (section) => {
      const sectionInfo = card[section];
      console.log("Loading", section, "from file:", sectionInfo?.file);
      if (sectionInfo && sectionInfo.file) {
        // Build the import path relative to src/helperfunction
        const importPath = `../../Data/${sectionInfo.folder}/${sectionInfo.file}.js`;
        try {
          const module = await import(importPath);
          // Assume each data file exports a variable named 'data' (or 'quiz' if that's the case)
          dataObj[section] = module.data || module.quiz || null;
        } catch (error) {
          console.error(`Error importing ${section} data from ${importPath}:`, error);
          dataObj[section] = null;
        }
      } else {
        dataObj[section] = null;
      }
    })
  );

  return dataObj;
};
