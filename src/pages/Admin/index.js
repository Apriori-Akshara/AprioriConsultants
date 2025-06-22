import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarJS";
import styles from "../../styles/AdminDashboard.module.css";
import {
  FaBookOpen,
  FaClipboardCheck,
  FaClock,
  FaRegClock,
  FaListAlt,
  FaTasks,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import RightSide from "../../../components/Admin/RightSide";
import Table from "../../../components/Admin/Table";
import CreateNewForm from "../../../components/Admin/CreateNewForm";
import SearchBar from "../../../components/Admin/SearchBar";

export default function AdminDashboard() {
   const [selection, setSelection] = useState({ section: "Auth", language: "Users" });
  const [allCollections, setAllCollections] = useState([]);
  const [formData, setFormData] = useState(null); // Manage form data for edit
  const [showForm, setShowForm] = useState(false); // Manage form visibility
  const [ loading, setLoading ] = useState(false)
  const URL = process.env.NEXT_PUBLIC_BACKENDURL

   let sect = selection.section.replace(/^'|'$/g, ''); // Clean up section name
  
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
      ? allCollections
      : allCollections.filter(item =>
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

  useEffect(() => {
    const fetchLessons = async () => {
      if (!selection.section || !selection.language) return;
      setLoading(true)
      try {
        const response = await fetch(`${URL}/api/${selection.section}/${selection.language}`);
        const data = await response.json();
        console.log(data)
        setAllCollections(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
      setLoading(false)
    };

    fetchLessons();
  }, [selection]);

  const refreshData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${URL}/api/${selection.section}/${selection.language}`);
      const updatedData = await response.json();
      setAllCollections(updatedData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setLoading(false)
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}/api/${selection.section}/${selection.language}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }

      alert(`Item with ID ${id} deleted successfully`);
      refreshData();
    } catch (error) {
      alert(`Error deleting item: ${error.message}`);
    }
  };

  const handleEdit = (item) => {
    setFormData(item); // Set form data for the selected item
    setShowForm(true); // Show the form
  };

  const handleLanguageSelection = (section, language) => {
    setSelection({ section, language });
  };
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <h1 className={styles.header}>Admin Dashboard</h1>
        <div className={styles.buttonRow}>
          <div className={styles.leftside}>
          <Link href="/Slip/Payment">
            <button className={styles.actionButton}>Payment Slip</button>
          </Link>
          <Link href="/Slip/Payslip">
            <button className={styles.actionButton}>Salary Slip</button>
          </Link>
        </div>
           <div className={styles.smallBar}>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <button className={styles.createButton} onClick={handleCreateNew}>
          Create New
        </button>
      </div>
        </div>
        <div className={styles.dashboardContent}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Navigation</h2>
            <ul className={styles.sidebarList}>
              <li>
                <FaUser className={styles.sidebarIcon} /> Users
              </li>
              <li>
                <FaBookOpen className={styles.sidebarIcon} /> Lessons
              </li>
              <li>
                <FaClipboardCheck className={styles.sidebarIcon} /> Assignments
              </li>
              <li>
                <FaClock className={styles.sidebarIcon} /> Timed Drills
              </li>
              <li>
                <FaRegClock className={styles.sidebarIcon} /> Non-Timed Drills
              </li>
              <li>
                <FaListAlt className={styles.sidebarIcon} /> Exercises (Topic
                wise)
              </li>
              <li>
                <FaTasks className={styles.sidebarIcon} /> Section wise Tests
              </li>
              <li>
                <FaFileAlt className={styles.sidebarIcon} /> Practice Tests
              </li>
            </ul>
          </aside>
          <main className={styles.mainArea}>
            
             {showForm && (
        <CreateNewForm
          URL={URL}
          refreshData={refreshData}
          section={selection.section}
          language={selection.language}
          headings={headings[sect]}
          setShowForm={setShowForm}
          initialData={formData} 
          isCreatingNew={isCreatingNew}
        />
      )}
            <span>
            <Table
             URL={URL}
        data={filteredData}
        section={selection.section}
        headings={headings[sect]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshData={refreshData}
        setIsCreatingNew={setIsCreatingNew}
            />
          
            </span>
          </main>
        </div>
      </div>
    </>
  );
}
