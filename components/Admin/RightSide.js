import React, { useState } from 'react';
import styles from '@/styles/RightSide.module.css';
import SearchBar from './SearchBar';
import CreateNewForm from './CreateNewForm';
import Table from './Table';

export default function RightSide({
  URL,
  data,
  section,
  language,
  refreshData,
  onDelete,
  onEdit,
  formData,
  setFormData,
  setShowForm,
  showForm,  // New prop to control visibility of the form
}) {
  let sect = section.replace(/^'|'$/g, ''); // Clean up section name

  const headings = {
    'Auth': ["name","userId", "password", "using", "active", "trial", "type", "contest", "next"],
    'Lessons': ["id", "name", "level", "pdf", "video", "desc"],
    'Conversations': ["id", "title", "url", "youtube", "desc"],
    'Exercises': ["quiz", "name", "level", "topic", "questions"],
    'Reading': ["id", "name", "level", "Title", "readingText", "questions"],
    'Listening': ["id", "name", "level","audios", "questions"],
    'ReadingP': ["id", "name", "level", "readingText"],
    'Writing': ["id", "name", "level", "firstsent"],
    'PracticeTest': ["quiz", "name", "level", "topic", "questions"],
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCreateNew = () => {
    setShowForm(true); // Show the form when "Create New" is clicked
    setIsCreatingNew(true)
    setFormData(null)
  }

  // Filter the data based on the search term.
  // This filter checks if any field in the row (from the specified headings) includes the search term.
  const filteredData = searchTerm === ''
    ? data
    : data.filter(item =>
        headings[sect].some(heading => {
          const value = item[heading];
          if (value === undefined || value === null) return false;

          // Handle different data types:
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (typeof value === 'boolean') {
            // Convert boolean to a string representation ("yes" or "no")
            return (value ? 'yes' : 'no').includes(searchTerm.toLowerCase());
          } else if (Array.isArray(value)) {
            return value.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
          } else {
            // Fallback for numbers or objects
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
          }
        })
      );

  return (
    <div className={styles.right}>
      {/* Small Bar Section with Search and Create New Button */}
      <div className={styles.smallBar}>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <button className={styles.createButton} onClick={handleCreateNew}>
          Create New
        </button>
      </div>

      {/* Show Form if showForm is true */}
      {showForm && (
        <CreateNewForm
          URL={URL}
          refreshData={refreshData}
          section={section}
          language={language}
          headings={headings[sect]}
          setShowForm={setShowForm}
          initialData={formData} 
          isCreatingNew={isCreatingNew}
        />
      )}

      {/* Table Section */}
      <Table
        URL={URL}
        data={filteredData}
        section={section}
        headings={headings[sect]}
        onEdit={onEdit}
        onDelete={onDelete}
        refreshData={refreshData}
        setIsCreatingNew={setIsCreatingNew}
      />
    </div>
  );
}
