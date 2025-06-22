import React, { useEffect, useState } from 'react';
import styles from '@/styles/RightSide.module.css';
import QuestionsForm from './QuestionsForm';

const CreateNewForm = ({ URL, refreshData, section, headings, language,  setShowForm, initialData, isCreatingNew }) => {
  const [formData, setFormData] = useState({questions: []});
  const [loading, setLoading] = useState(false); // For submission state

  useEffect(() => {
    if (isCreatingNew) {
      setFormData({ questions: [], trial: false, contest: false, next: [] }); // Clear formData for a new entry
    } else if (initialData) {
      setFormData(initialData); // Populate form for editing
    }
  }, [isCreatingNew, initialData]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleactiveCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      active: e.target.checked, // Set boolean value
    }));
  };

    // Handle checkbox (boolean) change
    const handleCheckboxChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        trial: !e.target.checked, // Set boolean value
      }));
    };

    const handlecontestCheckboxChange = (e) => {
       setFormData((prevData) => ({
        ...prevData,
        contest: e.target.checked, // Set boolean value
      }));
    };

        // Handle checkbox (boolean) change
        const handleusingCheckboxChange = (e) => {
          setFormData((prevData) => ({
            ...prevData,
            using: e.target.checked, // Set boolean value
          }));
        };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = initialData ? 'PUT' : 'POST'; // Update if editing
      const url = initialData
        ? `${URL}/api/${section}/${language}/${initialData._id}`
        : `${URL}/api/${section}/${language}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${initialData ? 'update' : 'create'}: ${response.statusText}`);
      }
      setShowForm(false);
      refreshData();
    } catch (error) {
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Hide the form without submitting
  };

  // Handle updating a specific index in the firstsent array
const handleFirstSentChange = (e, index) => {
  const newSentences = [...formData.firstsent];
  newSentences[index] = e.target.value;
  setFormData({ ...formData, firstsent: newSentences });
};

// Add a new empty input field for firstsent
const addFirstSent = () => {
  setFormData({ ...formData, firstsent: [...(formData.firstsent || []), ''] });
};

// Remove a sentence by index
const removeFirstSent = (index) => {
  const newSentences = formData.firstsent.filter((_, idx) => idx !== index);
  setFormData({ ...formData, firstsent: newSentences });
};

  // Handle `next` array changes
  const handleNextChange = (e, index) => {
    const newNext = [...formData.next];
    newNext[index] = e.target.value;
    setFormData({ ...formData, next: newNext });
  };

const addNext = () => {
  setFormData({ ...formData, next: [...(formData.next || []), ''] });
};

const removeNext = (index) => {
  const newNext = formData.next.filter((_, idx) => idx !== index);
  setFormData({ ...formData, next: newNext });
};

  return (
    <div className={styles.modalOverlay}>
    <div className={styles.formContainer}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formGrid}>
          {headings.map((heading, index) => (
            <div
              key={index}
              className={`${styles.formField} ${
                heading === 'desc' || heading === 'questions' || heading === 'readingText' ? styles.fullWidth : ''
              }`}
            >
              <label htmlFor={heading}>{heading === 'using' ? 'issued' : heading === 'trial' ? 'Full access' : heading}</label>
              {heading === 'id' ? (
                <input
                  type="text"
                  id={heading}
                  name={heading}
                  value={formData[heading] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter ${heading}`}
                  className={styles.smallInput}
                  required
                />
              ) : heading === 'desc' || heading === 'readingText' ? (
                <textarea
                  id={heading}
                  name={heading}
                  value={formData[heading] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter ${heading}`}
                  className={styles.textareaInput}
                  required
                ></textarea>
              ) : heading === 'video' ? (
                <input
                  type="text"
                  id={heading}
                  name={heading}
                  value={formData[heading] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter ${heading}`}
                />
              ) : heading === 'trial' ? (
                <label className={styles.switch}>
                <input
                  type="checkbox"
                  id={heading}
                  name={heading}
                  checked={!formData.trial || false}
                  onChange={handleCheckboxChange}
                />
                <span className={styles.slider}></span>
              </label>
              ) : heading === 'contest' ? (
                <label className={styles.switch}>
                <input
                  type="checkbox"
                  id={heading}
                  name={heading}
                  checked={formData.contest || false}
                  onChange={handlecontestCheckboxChange}
                />
                <span className={styles.slider}></span>
              </label>
              ) : heading === 'using' ? (
                <label className={styles.switch}>
                <input
                  type="checkbox"
                  id={heading}
                  name={heading}
                  checked={formData.using || false}
                  onChange={handleusingCheckboxChange}
                />
                <span className={styles.slider}></span>
              </label>
              ) : heading === 'active' ? (
                <label className={styles.switch}>
                <input
                  type="checkbox"
                  id={heading}
                  name={heading}
                  checked={formData.active || false}
                  onChange={handleactiveCheckboxChange}
                />
                <span className={styles.slider}></span>
              </label>
              ) : heading === 'firstsent' ? (
                <div className={styles.arrayInputContainer}>
                  {formData.firstsent && formData.firstsent.length > 0 ? (
                    formData.firstsent.map((sentence, idx) => (
                      <div key={idx} className={styles.arrayInput}>
                        <input
                          type="text"
                          name={`firstsent-${idx}`}
                          value={sentence}
                          onChange={(e) => handleFirstSentChange(e, idx)}
                          placeholder={`Sentence ${idx + 1}`}
                        />
                        <button type="button" onClick={() => removeFirstSent(idx)}>❌</button>
                      </div>
                    ))
                  ) : (
                    <p className={styles.errorpara}>No sentences added.</p>
                  )}
                  <button type="button" onClick={addFirstSent}>➕ Add Sentence</button>
                </div>
              ): heading === 'next' ? (
                <div className={styles.arrayInputContainer}>
                  {formData?.next?.map((item, idx) => (
                    <div key={idx} className={styles.arrayInput}>
                      <input
                        type="text"
                        name={`next-${idx}`}
                        value={item}
                        onChange={(e) => handleNextChange(e, idx)}
                        placeholder={`Next ${idx + 1}`}
                      />
                      <button type="button" onClick={() => removeNext(idx)}>❌</button>
                    </div>
                  ))}
                  <button type="button" onClick={addNext}>➕ Add Next</button>
                </div>
              ) : heading === 'questions' ? (
                <QuestionsForm PformData={formData} PsetFormData={setFormData} section={section} isCreatingNew={isCreatingNew}/>
              ) 
              : (
                <input
                  type="text"
                  id={heading}
                  name={heading}
                  value={formData[heading] || ''}
                  onChange={handleInputChange}
                  placeholder={`Enter ${heading}`}
                />
              )}
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateNewForm;
