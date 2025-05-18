import React, { useState, useRef } from "react";
import styles from "@/styles/Paymentform.module.css";
import jsPDF from "jspdf";
import Navbar from "../../../../components/NavbarJS";
import "jspdf-autotable";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaBook,
  FaGraduationCap,
  FaPercent,
  FaRupeeSign,
  FaListOl,
  FaCalculator,
  FaFileInvoice,
  FaLayerGroup,
  FaSortNumericUp,
  FaClipboardCheck,
  FaCheckCircle,
  FaListAlt,
  FaToggleOn
} from "react-icons/fa";

const ReferralForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    duration: "",
    course: "",
    language: "",
    level: "",
    scholarship: "",
    rate: "",
    quantity: "",
    subtotal: "",
    total: "",
    type: "Free Version",
  });

  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false); // State to toggle between pages

  // Only validate fields that are part of the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.course) newErrors.course = "Please select a course";
    if (!formData.language) newErrors.language = "Please select a language";
    // Additional validations for new fields can be added if required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate a unique receipt ID
  const createReceipt = () => {
    const prefix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const now = new Date();
    const datePart = now.toISOString().split("T")[0].replace(/-/g, "");
    const timePart = now.toTimeString().split(" ")[0].replace(/:/g, "");
    return `${prefix}-${datePart}-${timePart}`;
  };

  const downloadReceipt = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const doc = new jsPDF();
      const labelX = 10;
      const valueX = 50;

      // Add your company logo
      const imgData = "/logo/logo.jpg"; // Ensure this path is correct
      doc.addImage(imgData, "PNG", 175, 10, 20, 7.5);

      // Company details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Apriori Education", 10, 18);
      doc.setFontSize(10);
      doc.setFont("Helvetica", "normal");
      doc.text("Address: E - 200, Lajpat Nagar 1,", 10, 30);
      doc.text("New Delhi - 110024,", 10, 35);
      doc.text("Delhi, India", 10, 40);
      doc.text("Email: info@upskilleduonline.com", 10, 45);
      doc.text("Phone: +91 97171 89650/ 659", 10, 50);

      // Invoice Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Invoice Details", 10, 62);
      doc.line(10, 65, 200, 65);
      doc.setFontSize(10);

      const invoiceLabels = ["Receipt Id", "Receipt Date"];
      const invoiceValues = [createReceipt(), new Date().toLocaleDateString()];
      const invoiceStartY = 72;
      const invoiceLineHeight = 7;

      invoiceLabels.forEach((label, index) => {
        const yPos = invoiceStartY + index * invoiceLineHeight;
        doc.setFont("Helvetica", "bold");
        doc.text(`${label}:`, labelX, yPos);
        doc.setFont("Helvetica", "normal");
        doc.text(`${invoiceValues[index]}`, valueX, yPos);
      });

      // Billing Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Billing Details", 10, 92);
      doc.line(10, 95, 200, 95);
      doc.setFontSize(10);

      const billingLabels = ["Name", "Email", "Phone"];
      const billingValues = [formData.name, formData.email, formData.phone];
      const billingStartY = 102;
      const billingLineHeight = 7;

      billingLabels.forEach((label, index) => {
        const yPos = billingStartY + index * billingLineHeight;
        doc.setFont("Helvetica", "bold");
        doc.text(`${label}:`, labelX, yPos);
        doc.setFont("Helvetica", "normal");
        doc.text(`${billingValues[index]}`, valueX, yPos);
      });

      // Course Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Course Details", 10, 127);
      doc.line(10, 130, 200, 130);
      doc.setFontSize(10);

      // Build an array of course details conditionally
      const courseDetails = [
        { label: "Course", value: formData.language },
        // Conditionally include Level if provided
        ...(formData.level ? [{ label: "Level", value: formData.level }] : []),
        { label: "Duration", value: formData.duration },
        { label: "Scholarship", value: formData.scholarship },
      ];

      const courseStartY = 137;
      const courseLineHeight = 8;
      const boxWidth = 50;
      const boxHeight = 6;

      courseDetails.forEach((item, index) => {
        const yPos = courseStartY + index * courseLineHeight;
        doc.setFont("Helvetica", "bold");
        doc.text(`${item.label}:`, labelX, yPos);
        // Draw a border if desired
        doc.rect(valueX, yPos - 4, boxWidth, boxHeight);
        doc.setFont("Helvetica", "normal");
        doc.text(`${item.value}`, valueX + 2, yPos);
      });

      // Table of Products
      const columns = [
        "ID",
        "Mode/ Category",
        "Rate",
        "Qty",
        "Scholarship",
        "SubTotal",
        "Total",
      ];
      const products = [
        {
          id: "1",
          product: formData.course,
          rate: formData.rate,
          qty: formData.quantity,
          scholarship: formData.scholarship,
          subtotal: formData.subtotal,
          total: formData.total,
        },
      ];
      const data = products.map((item) => [
        item.id,
        item.product,
        item.rate,
        item.qty,
        item.scholarship,
        item.subtotal,
        item.total,
      ]);

      const headerColor = [54, 69, 79];
      const rowColor = [255, 255, 255];

      doc.autoTable({
        startY: 180,
        head: [columns],
        body: data,
        theme: "grid",
        margin: { horizontal: 10 },
        columnStyles: {
          0: { cellWidth: 15 }, // ID
          1: { cellWidth: 50 }, // Course
          2: { cellWidth: 20 }, // Rate
          3: { cellWidth: 15 }, // Qty
          4: { cellWidth: 30 }, // Scholarship
          5: { cellWidth: 25 }, // SubTotal
          6: { cellWidth: 25 }, // Total
        },
        headStyles: {
          fillColor: headerColor,
          textColor: [255, 255, 255],
        },
        styles: {
          fillColor: rowColor,
          textColor: [0, 0, 0],
        },
      });

      // Totals Calculation (if needed, you may recalc subtotal/total based on rate & quantity)
      let currentY = doc.autoTable.previous.finalY + 10;
      doc.text(`Sub Total: Rs ${formData.subtotal}`, 130, currentY);
      currentY += 5;
      doc.text(`Grand Total: Rs ${formData.total}`, 130, currentY);

      if (showTerms) {
        doc.addPage();
        doc.addImage(imgData, "PNG", 175, 10, 20, 20);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Upskilledu Solutions", 10, 18);
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        doc.text("Address: E - 200, Lajpat Nagar 1,", 10, 30);
        doc.text("New Delhi - 110024,", 10, 35);
        doc.text("Delhi, India", 10, 40);
        doc.text("Email: info@upskilleduonline.com", 10, 45);
        doc.text("Phone: +91 97171 89650/ 659", 10, 50);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Terms and Conditions", 10, 65);

        const termsContent = [
          {
            title: "Introduction",
            content:
              "Welcome to Upskilledu Solutions LLP, an Ed Tech platform offering language courses in Asian and European\n\nlanguages. By accessing or using our website, you agree to comply with and be bound by the following terms and\n\nconditions.",
          },
          {
            title: "User Accounts",
            content:
              "Registration: To access certain features, you must create an account. You are responsible for maintaining the\n\nconfidentiality of your account information.\n\nEligibility: You must be at least 18 years old or have parental consent to use this platform.",
          },
          {
            title: "Course Enrollment",
            content:
              "Access: Upon enrollment, you gain access to the course materials for a specified duration.\n\nUsage: Course materials are for personal use only and cannot be shared or redistributed.",
          },
          {
            title: "Payment Terms",
            content:
              "Fees: All course fees must be paid in full at the time of enrollment.\n\nPayment Gateway: We use secure payment gateways. By providing your payment information, you authorize\n\nus to charge the applicable fees.\n\nNO REFUNDS POLICY: We do NOT ISSUE REFUNDS since clients and visitors are allowed to avail of a\n\nFREE TRIAL before making the payment.",
          },
        ];

        let yPosition = 75;
        termsContent.forEach((section) => {
          doc.setFontSize(14);
          doc.setFont("Helvetica", "bold");
          doc.text(section.title, 10, yPosition);
          yPosition += 10;

          doc.setFontSize(10);
          doc.setFont("Helvetica", "normal");
          const lines = doc.splitTextToSize(section.content, 190);
          doc.text(lines, 14, yPosition);
          yPosition += lines.length * 6;
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
        });
      }

      // Save the PDF
      doc.save("Payment_Receipt.pdf");

      // Reset form state if desired
      setFormData({
        name: "",
        phone: "",
        email: "",
        duration: "",
        course: "",
        language: "",
        level: "",
        scholarship: "",
        rate: "",
        quantity: "",
        subtotal: "",
        total: "",
        type: "Free Version",
      });
      setErrors({});
      setShowTerms(false);
    }
  };

  return (
    <><Navbar/>
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          <FaFileInvoice className={styles.icon} style={{ marginRight: 8 }} />
          Create Receipt
        </h1>
        <div className={styles.note}>
          <b>Note: </b>Field marked with <span className={styles.span}>*</span>{" "}
          are mandatory to fill.
        </div>
        <form
          ref={form}
          onSubmit={downloadReceipt}
          className={styles.form}
          noValidate
        >
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">
                <FaUser className={styles.icon} /> Name <span className={styles.span}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={
                  errors.name
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">
                <FaPhone className={styles.icon} /> Phone <span className={styles.span}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className={
                  errors.phone
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                <FaEnvelope className={styles.icon} /> Email <span className={styles.span}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={
                  errors.email
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="duration">
                <FaClock className={styles.icon} /> Duration <span className={styles.span}>*</span>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                className={
                  errors.duration
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
              />
              {errors.duration && (
                <span className={styles.errorText}>{errors.duration}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="language">
                <FaBook className={styles.icon} /> Course <span className={styles.span}>*</span>
              </label>
              <select
                id="language"
                name="language"
                required
                value={formData.language}
                onChange={handleChange}
                className={
                  errors.language
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
              >
                <option value="">Select a Course</option>
                <option value="English">English</option>
                <option value="English Aptitude">English Aptitude</option>
                <option value="SAT">SAT</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                <option value="Math Aptitude">Math Aptitude</option>
                <option value="Reading Club">Reading Club</option>
                <option value="Writing Club">Writing Club</option>
                <option value="Workshop">Workshop</option>
                <option value="Contest and Event">Contest and Event</option>
                <option value="Olympiad">Olympiad</option>
              </select>
              {errors.language && (
                <span className={styles.errorText}>{errors.language}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="level">
                <FaGraduationCap className={styles.icon} /> Level <span className={styles.span}>*</span>
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select a level</option>
                <option value="Foundation">Foundation</option>
                <option value="Advanced">Advanced</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="course">
                <FaLayerGroup className={styles.icon} /> Category <span className={styles.span}>*</span>
              </label>
              <select
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                className={
                  errors.course
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
              >
                <option value="">Select a Category</option>
                <option value="Self study package">Self study package</option>
                <option value="Online">
                  Online
                </option>
                <option value="Online Classes for Adults">
                  Online Classes for Adults
                </option>
                <option value="Online Classes for Children">
                  Online Classes for Children
                </option>
                <option value="Self study package + Doubt sessions">
                  Self study package + Doubt sessions
                </option>
                <option value="Single workshop">Single workshop</option>
                <option value="Monthly Package">Monthly Package</option>
              </select>
              {errors.course && (
                <span className={styles.errorText}>{errors.course}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="scholarship">
                <FaPercent className={styles.icon} /> Scholarship
              </label>
              <input
                type="text"
                id="scholarship"
                name="scholarship"
                value={formData.scholarship}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="rate">
                <FaRupeeSign className={styles.icon} /> Rate
              </label>
              <input
                type="text"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="quantity">
                <FaSortNumericUp className={styles.icon} /> Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subtotal">
                <FaCalculator className={styles.icon} /> Subtotal Amount
              </label>
              <input
                type="text"
                id="subtotal"
                name="subtotal"
                value={formData.subtotal}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="total">
                <FaCalculator className={styles.icon} /> Total Amount
              </label>
              <input
                type="text"
                id="total"
                name="total"
                value={formData.total}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          <label className={styles.label} htmlFor="terms">
            <FaToggleOn className={styles.icon} /> Print Terms and Conditions
          </label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={showTerms}
              onChange={() => setShowTerms(!showTerms)}
            />
            <span className={styles.slider}></span>
          </label>

          <button type="submit" className={styles.submitButton}>
            <FaCheckCircle style={{ marginRight: 8, marginBottom: -2 }} />
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ReferralForm;
