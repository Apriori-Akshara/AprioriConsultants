import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "@/styles/Payslip.module.css";
import Navbar from "../../../../components/NavbarJS";
import { FaUser, FaBriefcase, FaBuilding, FaCalendarAlt, FaIdCard, FaRegCalendarCheck, FaRegCalendarMinus, FaRegCalendarPlus, FaMoneyCheckAlt, FaUniversity, FaHashtag, FaRupeeSign, FaGift, FaPiggyBank, FaMinusCircle, FaBank } from "react-icons/fa";

const Payslip = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    dateOfJoining: "",
    pan: "",
    daysPayable: "",
    unpaidLeave: "",
    leavesTaken: "",
    payslipMonth: "2025-04",
    grossSalary: "",
    basic: "",
    hra: "",              // ← added HRA field
    specialAllowance: "",
    bonus: "0",
    incomeTax: "0",
    otherDeductions: "0",
    daysLOP: "0",
    bankName: "",
    bankAccountNo: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatAmount = amount => {
    const num = Number(amount || 0);
    return `Rs. ${num.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  const downloadPayslip = e => {
    e.preventDefault();
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const w = doc.internal.pageSize.width;
    let y = 40;

    // Header
    doc.addImage("/logo/logo.jpg", "PNG", 40, y, 60, 20);
    doc.setFont("Helvetica", "bold").setFontSize(20);
    doc.text("Apriori Education", w/2, y+20, { align: "center" });
    doc.setFont("Helvetica", "normal").setFontSize(10);
    [
      "E 200, Lajpat Nagar, Part 1,",
      "New Delhi - 110024,",
      "Delhi, India",
    ].forEach((line,i)=>
      doc.text(line, w/2, y+40+i*12, { align: "center" })
    );
    y += 100;

    // Title
    const monthLabel = `Payslip for the month of ${new Date(
      formData.payslipMonth
    ).toLocaleString("en", { month:"long", year:"numeric" })}`;
    doc.setFillColor("#36454F");
    doc.rect(40, y-18+6, w-80, 20, "F");
    doc.setFont("Helvetica","bold").setFontSize(14).setTextColor("#fff");
    doc.text(monthLabel, w/2, y+2, { align:"center" });
    doc.setTextColor("#000");
    y += 26;

    // Employee Details
    const leftX = 40, rightX = w/2 + 10, labelW = 100, lh = 18;
    const leftDetails = [
      ["Date", "2025-04-07"],
      ["Name", formData.name],
      ["Designation", formData.designation],
      ["Department", formData.department],
      ["Date of Joining", formData.dateOfJoining],
      ["Days Payable", formData.daysPayable],
      ["Unpaid Leave", formData.unpaidLeave],
      ["Leaves Taken", formData.leavesTaken],
    ];
    const rightDetails = [
      ["PAN No", formData.pan],
      ["Bank Name", formData.bankName],
      ["Bank A/C No.", formData.bankAccountNo],
      ["LOP Days", formData.daysLOP],
    ];

    doc.setFont("Helvetica","bold").setFontSize(10);
    leftDetails.forEach(([label,value],i)=>{
      const yy = y + i*lh;
      doc.text(`${label}:`, leftX, yy);
      doc.setFont("Helvetica","normal").text(value||"-", leftX+labelW, yy);
      doc.setFont("Helvetica","bold");
    });
    rightDetails.forEach(([label,value],i)=>{
      const yy = y + i*lh;
      doc.text(`${label}:`, rightX, yy);
      doc.setFont("Helvetica","normal").text(value||"-", rightX+labelW, yy);
      doc.setFont("Helvetica","bold");
    });

    y += Math.max(leftDetails.length, rightDetails.length)*lh +20;
    doc.setLineWidth(0.5).line(40,y, w-40, y);
    y += 30;

    // Form Part of Salary
    doc.setFont("Helvetica", "bold").setFontSize(12);
    doc.text("Form Part of Salary", 40, y);
    y += 10;

    const earnings = [
      ["Basic", formData.basic],
      ["HRA", formData.hra],                    // ← HRA row
      ["Special Allowance", formData.specialAllowance],
      ["Bonus", formData.bonus],
    ];

    let totalE = 0;
   // Earnings
const earningsRows = earnings.map(([label, amount]) => {
    totalE += parseFloat(amount || 0);
    return [
      label,
      amount !== "0" ? formatAmount(amount) : "-",    // ← show "-" when zero
    ];
  });
  earningsRows.push(["Total Earnings", formatAmount(totalE)]);

    doc.autoTable({
      startY: y + 10,
      theme: "grid",
      head: [[
        { content: "Earnings", styles: { fillColor: "#36454F", textColor: "#fff", fontStyle: "bold", halign: "left" } },
        { content: "Amount",   styles: { fillColor: "#36454F", textColor: "#fff", fontStyle: "bold", halign: "left" } },
      ]],
      body: earningsRows,
      styles: { font: "Helvetica", fontSize: 10, textColor: "#000" },
      columnStyles: { 1: { halign: "left" } },
      margin: { left: 40, right: 40 },
    });

    y = doc.lastAutoTable.finalY + 30;

    // Deductions
    doc.setFont("Helvetica", "bold").setFontSize(12);
    doc.text("Deductions", 40, y);
    y += 10;

    const deductions = [
      ["TDS", formData.incomeTax],
      ["Other Deductions", formData.otherDeductions],
    ];

    let totalD = 0;
    const deductionsRows = deductions.map(([label, amount]) => {
        totalD += parseFloat(amount || 0);
        return [
          label,
          amount !== "0" ? formatAmount(amount) : "-",    // ← show "-" when zero
        ];
      });
      deductionsRows.push(["Total Deductions", formatAmount(totalD)]);

    doc.autoTable({
      startY: y + 10,
      theme: "grid",
      head: [[
        { content: "Deductions", styles: { fillColor: "#36454F", textColor: "#fff", fontStyle: "bold", halign: "left" } },
        { content: "Amount",     styles: { fillColor: "#36454F", textColor: "#fff", fontStyle: "bold", halign: "left" } },
      ]],
      body: deductionsRows,
      styles: { font: "Helvetica", fontSize: 10, textColor: "#000" },
      columnStyles: { 1: { halign: "left" } },
      margin: { left: 40, right: 40 },
    });

    y = doc.lastAutoTable.finalY + 30;

    // Net Pay
    const netPay = (totalE - totalD).toFixed(2);
    const netPayText = `Net Pay for the Month: ${formatAmount(netPay)}`;
    doc.setFont("Helvetica", "bold").setFontSize(12);
    doc.text(netPayText, w/2, y, { align: "center" });
    y += 30;

    // Footer
    doc.setFont("Helvetica","normal").setFontSize(8);
    doc.text("This is a system generated payslip and does not require signature.", w/2, y, { align:"center" });
    doc.text("Authorised Signatory (HR Department)", w/2, y+12, { align:"center" });
    doc.text("For more details, visit www.aprioriconsultants.org", w/2, y+24, { align:"center" });

    doc.save(`Salary-Slip-${formData.name}-${formData.payslipMonth}.pdf`);
  };

  return (
    <>
    <Navbar />
    <div className={styles.background}>
      <h1 className={styles.heading}>
        <FaMoneyCheckAlt style={{ marginRight: 10, color: "#3b82f6" }} />
        Payslip Form
      </h1>
      <form onSubmit={downloadPayslip} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.containers}>
            <label><FaUser className={styles.icon} /> Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaBriefcase className={styles.icon} /> Designation:</label>
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaBuilding className={styles.icon} /> Department:</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaCalendarAlt className={styles.icon} /> Date of Joining:</label>
            <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaIdCard className={styles.icon} /> PAN:</label>
            <input type="text" name="pan" value={formData.pan} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaRegCalendarCheck className={styles.icon} /> Days Payable:</label>
            <input type="number" name="daysPayable" value={formData.daysPayable} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaRegCalendarMinus className={styles.icon} /> Unpaid Leave:</label>
            <input type="number" name="unpaidLeave" value={formData.unpaidLeave} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaRegCalendarPlus className={styles.icon} /> Leaves Taken:</label>
            <input type="number" name="leavesTaken" value={formData.leavesTaken} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaCalendarAlt className={styles.icon} /> Payslip Month:</label>
            <input type="month" name="payslipMonth" value={formData.payslipMonth} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaRupeeSign className={styles.icon} /> Gross Salary:</label>
            <input type="number" name="grossSalary" value={formData.grossSalary} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaRupeeSign className={styles.icon} /> Basic:</label>
            <input type="number" name="basic" value={formData.basic} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaPiggyBank className={styles.icon} /> HRA:</label>
            <input type="number" name="hra" value={formData.hra} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaGift className={styles.icon} /> Special Allowance:</label>
            <input type="number" name="specialAllowance" value={formData.specialAllowance} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaGift className={styles.icon} /> Bonus:</label>
            <input type="number" name="bonus" value={formData.bonus} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaMinusCircle className={styles.icon} /> Income Tax:</label>
            <input type="number" name="incomeTax" value={formData.incomeTax} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaMinusCircle className={styles.icon} /> Other Deductions:</label>
            <input type="number" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaRegCalendarMinus className={styles.icon} /> LOP Days:</label>
            <input type="number" name="daysLOP" value={formData.daysLOP} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaUniversity className={styles.icon} /> Bank Name:</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.containers}>
            <label><FaHashtag className={styles.icon} /> Bank Account No.:</label>
            <input type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} className={styles.input} />
          </div>
        </div>
        <button type="submit" className={styles.button}>
          <FaMoneyCheckAlt style={{ marginRight: 8, marginBottom: -2 }} />
          Generate Payslip
        </button>
      </form>
    </div>
    </>
  );
};

export default Payslip;
