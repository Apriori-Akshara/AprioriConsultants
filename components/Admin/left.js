import React, { useState } from 'react';
import styles from '../../src/styles/Admin.module.css';
import { FaChevronDown } from 'react-icons/fa'; // Arrow down icon

const DropdownSection = ({ sectionName, languages, isActive, onClick, onLanguageSelect, text }) => {
  return (
    <li onClick={() => onClick(sectionName)}>
      <div className={styles.flexing}>
        {text}       
        <FaChevronDown className={`${styles.dropdownIcon} ${isActive ? styles.open : ''}`} />
      </div>
      <ul className={isActive ? styles.dropdownMenu : styles.dropdownMenu1}>
        {languages.map((language, index) => (
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

export default function Left({ onLanguageSelect }) {
  const [activeSection, setActiveSection] = useState(null); // Track selected section
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility

  const handleSectionClick = (section) => {
    if (activeSection === section) {
      setIsOpen(!isOpen); // Toggle dropdown open/close
    } else {
      setActiveSection(section); // Set active section
      setIsOpen(true); // Open dropdown
    }
  };

  const languages = ['FrenchA1', 'FrenchA2', 'FrenchB1', 'FrenchB2', 'SpanishA1','SpanishA2', 'GermanA1', 'GermanA2', 'ItalianA1', 'RussianA1', 'DutchA1', 'KoreanA1', 'JapaneseA1', 'DanishA1'];

  return (
    <ul className={styles.leftlist}>
      <div className={styles.heading2}>Sections</div>

      {/* Reusable DropdownSection Component */}
      <div className={styles.user} onClick={() => onLanguageSelect("Auth", "Users")}>Users</div>
      <DropdownSection
        sectionName="Lessons"
        text="Lessons"
        languages={languages}
        isActive={activeSection === 'Lessons' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Exercises"
        text="Exercises"
        languages={languages}
        isActive={activeSection === 'Exercises' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Conversations"
        text="Conversations"
        languages={languages}
        isActive={activeSection === 'Conversations' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Reading"
        text="Reading Assignments"
        languages={languages}
        isActive={activeSection === 'Reading' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Listening"
        text="Lessons Assignments"
        languages={languages}
        isActive={activeSection === 'Listening' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="ReadingP"
        text="Reading Practice"
        languages={languages}
        isActive={activeSection === 'ReadingP' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="Writing"
        text="Writing"
        languages={languages}
        isActive={activeSection === 'Writing' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
      <DropdownSection
        sectionName="PracticeTest"
        text="Practice Test"
        languages={languages}
        isActive={activeSection === 'PracticeTest' && isOpen}
        onClick={handleSectionClick}
        onLanguageSelect={onLanguageSelect} // Pass the function to handle language selection
      />
    </ul>
  );
}
