import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { login } from "../../Store";
import styles from "../../styles/Login.module.css";
import LoadingSpinner from "../../../components/loader";
import Navbar from "../../../components/NavbarJS";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      if (!data.user?.active) {
        setError("User Validity Expired");
        setLoading(false);
        return;
      }

      dispatch(
        login({
          userId: data.user.userId,
          name: data.user.name,
          admin: data.user.admin,
          trial: data.user.trial,
          type: data.user.type,
          next: data.user.next,
          active: data.user.active,
          completedQuizzes: data.user.completedQuizzes || [],
        })
      );

      const requestedReturnTo =
        typeof router.query.returnTo === "string"
          ? router.query.returnTo
          : "";

      const isSafeReturnTo =
        requestedReturnTo.startsWith("/SATMocks") &&
        !requestedReturnTo.startsWith("//") &&
        !/[\r\n]/.test(requestedReturnTo);

      setLoading(false);
      router.push(isSafeReturnTo ? requestedReturnTo : "/");
    } catch (requestError) {
      console.error("Login request error:", requestError);
      setLoading(false);
      setError("Unable to complete login. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />

      {loading && (
        <div className={styles.loader}>
          <LoadingSpinner />
        </div>
      )}

      <motion.div
        className={styles.loginContainer}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          className={styles.loginBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={styles.title}>Login</h2>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="userId" className={styles.label}>
                Student ID
              </label>
              <input
                type="text"
                id="userId"
                className={styles.inputField}
                value={userId}
                onChange={(e) => setUserId(e.target.value.trim())}
                placeholder="Enter your Student ID"
                autoComplete="username"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <motion.button
              className={styles.loginButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <button
            type="button"
            onClick={() => router.push("/Register")}
            style={{
              marginTop: "15px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            New student? Create an account
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
