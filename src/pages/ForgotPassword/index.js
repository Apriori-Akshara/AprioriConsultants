import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/NavbarJS";
import styles from "../../styles/Login.module.css";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setSuccess(response.ok && data.success);
      setMessage(data.message || "Please check your email.");
    } catch (error) {
      console.error("Password recovery request failed:", error);
      setSuccess(false);
      setMessage("Unable to process the request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>Forgot Student ID or Password?</h2>

          <p style={{ lineHeight: 1.6, marginBottom: "20px" }}>
            Enter the email address you used when registering. If it belongs to
            a verified account, we will email your Student ID and a secure link
            to create a new password.
          </p>

          {success ? (
            <>
              <p className={styles.success}>{message}</p>
              <button
                type="button"
                className={styles.loginButton}
                onClick={() => router.push("/Auth")}
              >
                Back to Login
              </button>
            </>
          ) : (
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Registered Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.inputField}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  required
                />
              </div>

              {message && <p className={styles.error}>{message}</p>}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={loading}
              >
                {loading ? "Sending..." : "Email My Account Details"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
