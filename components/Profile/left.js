import React, { useEffect, useState } from 'react';
import styles from '../../src/styles/Profile.module.css';
import { FaChevronDown } from 'react-icons/fa'; // Arrow down icon

const DropdownSection = ({ sectionName, language, isActive, onClick, onLanguageSelect, text }) => {
  return (
    <li onClick={() => onClick(sectionName)}>
      <div className={styles.flexing}>
        {text}       
        <FaChevronDown className={`${styles.dropdownIcon} ${isActive ? styles.open : ''}`} />
      </div>
      <ul className={isActive ? styles.dropdownMenu : styles.dropdownMenu1}>
        {language.map((language, index) => (
          <li 
            key={index} 
            onClick={() => onLanguageSelect(sectionName, language)} // Pass both sectionName and language
          >
            {language}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default function Left({ user, onLanguageSelect }) {
  const [activeSection, setActiveSection] = useState(null); // Track selected section
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility
  const [language, setLanguage] = useState(user?.type ? [user.type] : []);

  const handleSectionClick = (section) => {
    if (activeSection === section) {
      setIsOpen(!isOpen); // Toggle dropdown open/close
    } else {
      setActiveSection(section); // Set active section
      setIsOpen(true); // Open dropdown
    }
  };

  const languages = {'french':'French A1', 'frencha2': 'French A2', 'frenchb1': 'French B1', 'frenchb2': 'French B2', 'spanish' :'Spanish A1','spanish a2': 'Spanish A2', 'spanish b1': 'Spanish B1', 'germana1':'German A1', 'germana2':'German A2', 'germanb1':'German B1', 'germanb2':'German B2'}

  useEffect(() => {
    if (user) {
      // If the user type is "all", use all language values.
      if (user.type === 'all') {
        setLanguage(Object.values(languages));
      } else {
        // Otherwise, combine user.type with user.next (ensuring user.next is an array)
        const allowedKeys = [user.type, ...((Array.isArray(user.next) && user.next) || [])];
        
        // Filter languages to only include those keys that are in allowedKeys.
        const filteredLanguages = Object.keys(languages)
          .filter(key => allowedKeys.includes(key))
          .map(key => languages[key]);
          
        setLanguage(filteredLanguages);
      }
    }
  }, [user]);

  return (
    <ul className={styles.leftlist}>
      <div className={styles.heading2}>Statistics</div>

      {/* Reusable DropdownSection Component */}
      {/* <DropdownSection
        sectionName="Total"
        text="Progress Report"
        language={language}
        isActive={activeSection === 'Total' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect}
      /> */}
      <div className={styles.user} onClick={() => onLanguageSelect("SAT")}>Progress Report</div>
      <div className={styles.user} onClick={() => onLanguageSelect("Leader")}>Leaderboard</div>
        {/* <DropdownSection
        sectionName="Leader"
        text="Leadersboard"
        language={language}
        isActive={activeSection === 'Leader' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      /> */}
      {/* <DropdownSection
        sectionName="Exercises"
        text="Exercises"
        language={language}
        isActive={activeSection === 'Exercises' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Reading"
        text="Reading Assignments"
        language={language}
        isActive={activeSection === 'Reading' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Listening"
        text="Listening Assignments"
        language={language}
        isActive={activeSection === 'Listening' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="ReadingP"
        text="Reading Practice"
        language={language}
        isActive={activeSection === 'ReadingP' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Writing"
        text="Writing"
        language={language}
        isActive={activeSection === 'Writing' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="PracticeTest"
        text="Practice Test"
        language={language}
        isActive={activeSection === 'PracticeTest' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      /> */}
    </ul>
  );
}
