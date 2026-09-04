import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "../../../components/NavbarJS";
import styles from "../../styles/Login.module.css";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setUserId(data.user.user_id);

      setSuccess(
        "Registration successful. Your Student ID has been created. Email verification will be completed next."
      );

      setLoading(false);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <motion.div
        className={styles.loginContainer}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div className={styles.loginBox}>
          <h2 className={styles.title}>
            Create Student Account
          </h2>

          <form
            className={styles.loginForm}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputGroup}>
              <label
                htmlFor="name"
                className={styles.label}
              >
                Full Name
              </label>

              <input
                type="text"
                id="name"
                className={styles.inputField}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label
                htmlFor="password"
                className={styles.label}
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                minLength={8}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label
                htmlFor="confirmPassword"
                className={styles.label}
              >
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                className={styles.inputField}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Enter your password again"
                minLength={8}
                required
              />
            </div>

            {error && (
              <p className={styles.error}>
                {error}
              </p>
            )}

            {success && (
              <div>
                <p className={styles.success}>
                  {success}
                </p>

                {userId && (
                  <p>
                    <strong>Your Student ID:</strong>{" "}
                    {userId}
                  </p>
                )}
              </div>
            )}

            <motion.button
              className={styles.loginButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </motion.button>

            <button
              type="button"
              onClick={() => router.push("/Auth")}
              style={{
                marginTop: "15px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Already have an account? Login
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
