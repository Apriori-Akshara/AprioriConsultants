import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/NavbarJS";
import styles from "../../styles/Login.module.css";

export default function VerifyEmail() {
  const router = useRouter();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const token = router.query.token;

    if (!token) {
      setMessage("Verification token is missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(token)}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Email verification failed.");
          return;
        }

        setSuccess(true);
        setMessage(data.message);
      } catch (error) {
        console.error("Email verification request failed:", error);
        setMessage(
          "Something went wrong while verifying your email."
        );
      }
    };

    verifyEmail();
  }, [router.isReady, router.query.token]);

  return (
    <div>
      <Navbar />

      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>
            Email Verification
          </h2>

          <p className={success ? styles.success : styles.error}>
            {message}
          </p>

          {success && (
            <button
              type="button"
              className={styles.loginButton}
              onClick={() => router.push("/Auth")}
            >
              Continue to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
