import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/NavbarJS";
import styles from "../../styles/Login.module.css";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady && typeof router.query.token === "string") {
      setToken(router.query.token);
    }
  }, [router.isReady, router.query.token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("This password reset link is missing its security token.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      setMessage(data.message || "Unable to reset your password.");
      setSuccess(response.ok && data.success);
    } catch (error) {
      console.error("Password reset request failed:", error);
      setSuccess(false);
      setMessage("Unable to reset your password. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>Reset Password</h2>

          {success ? (
            <>
              <p className={styles.success}>{message}</p>
              <button
                type="button"
                className={styles.loginButton}
                onClick={() => router.push("/Auth")}
              >
                Continue to Login
              </button>
            </>
          ) : (
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.inputField}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={styles.inputField}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              {message && <p className={styles.error}>{message}</p>}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
