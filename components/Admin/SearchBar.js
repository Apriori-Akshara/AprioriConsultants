import React from 'react';
import { FaSearch } from "react-icons/fa";
import styles from '@/styles/RightSide.module.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span className={styles.searchIcon} onClick={() => handleSearch(searchTerm)}>
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
