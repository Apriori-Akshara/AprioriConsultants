import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'; // To access the router for navigation
import { motion } from 'framer-motion';
import { login } from '../../Store';
import { useCookies } from 'react-cookie';
import styles from '../../styles/Login.module.css';
import LoadingSpinner from '../../../components/loader'; // Adjust the path as necessary
import Navbar from '../../../components/NavbarJS'; // Adjust the path as necessary

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for the user's name
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const URL = process.env.NEXT_PUBLIC_BACKENDURL

  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['user']);

  // Helper function to merge quizzes from MongoDB and localStorage
  const mergeQuizzes = (mongoData, localData) => {
    // Start with the quizzes from MongoDB as the base
    const mergedData = [...mongoData];
    // Loop over each quiz in localStorage
    localData.forEach(localQuiz => {
      // Find an existing quiz in the mongoData that matches the exercise and language
      const found = mergedData.find(
        quiz => quiz.exercise === localQuiz.exercise && quiz.language === localQuiz.language
      );
      if (found) {
        // If found, add any questionTypes that are missing
        localQuiz.questionTypes.forEach(qType => {
          if (!found.questionTypes.includes(qType)) {
            found.questionTypes.push(qType);
          }
        });
      } else {
        // If not found, add the entire quiz from localStorage
        mergedData.push(localQuiz);
      }
    });
    return mergedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true)

    try {
    // Fetch IP address and location
    const locationResponse = await fetch('https://ipinfo.io/json?token=f865848db16a1a');
    const locationData = await locationResponse.json();

    const ipAddress = locationData.ip || 'Unknown';
    const location = locationData.city
      ? `${locationData.city}, ${locationData.region}, ${locationData.country}`
      : 'Unknown';

    // Send login request to the backend
    const response = await fetch(`${URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, userId, password, ipAddress, location }),
    });
    setLoading(false);

      const data = await response.json();
      if (data.success) {
        if(data.user.active){

           // Extract quizzes from MongoDB data (from your login response)
           const mongoQuizzes = data.user.completedQuizzes || [];

           // Retrieve legacy quizzes from localStorage
           let localQuizzes = [];
           if (typeof window !== 'undefined') {
             localQuizzes = localStorage.getItem('completedQuizzes')
               ? JSON.parse(localStorage.getItem('completedQuizzes'))
               : [];
           }
 
           // Merge the two sources of completed quizzes
           const mergedQuizzes = mergeQuizzes(mongoQuizzes, localQuizzes);
 
           // Update localStorage with the merged data
          //  if (typeof window !== 'undefined') {
          //    localStorage.setItem('completedQuizzes', JSON.stringify(mergedQuizzes));
          //    console.log('Updated localStorage:', localStorage.getItem('completedQuizzes'));
          //  }

        dispatch(login({ 
          userId: data.user.userId, 
          name: name,
          trial: data.user.trial, 
          type: data.user.type, 
          next: data.user.next,
          active: data.user.active,
          completedQuizzes: mergedQuizzes
         }));

        // Set the cookie using react-cookie
        setCookie('user', JSON.stringify({
        userId: data?.user?.userId,
        name,
        trial: data?.user?.trial,
        type: data?.user?.type,
        next: data.user.next,
        active: data.user.active,
        }), { path: '/', maxAge: 6 * 3600 });

        console.log("Cookie", cookies)

         localStorage.setItem('completedQuizzes', JSON.stringify(mergedQuizzes));

         const updateResponse = await fetch(`${URL}/api/completed-quizzes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: data.user.userId,
            completedQuizzes: mergedQuizzes,
          }),
        });
        const updateData = await updateResponse.json();
          router.push('/');

      } else if(!data.user.active){
        setError("User Validity Expired")
      }} else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>  
    <Navbar />
      {loading && <div className={styles.loader}><LoadingSpinner /></div>}
    <motion.div className={styles.loginContainer}>
      <motion.div
        className={styles.loginBox}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <h2 className={styles.title}>Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)} // Set name state
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="userId" className={styles.label}>User ID</label>
            <input
              type="text"
              id="userId"
              className={styles.inputField}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <motion.button
            className={styles.loginButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
    </div>
  )
}

