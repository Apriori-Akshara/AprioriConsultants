import { motion } from "framer-motion";
import styles from "../src/styles/loader.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;