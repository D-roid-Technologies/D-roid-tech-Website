"use client"

import type React from "react"
import { useState } from "react" // Import useState for managing component state
import { schoolFeesData, type SchoolCategory, type ClassLevel, type FeeItem } from "./school-fees-data"
import styles from "./SchoolFees.module.css"

// Helper function to format currency in Nigerian Naira
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0, // Nigerian Naira typically doesn't use kobo in daily transactions
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to calculate total fees for a single class level
const calculateClassLevelTotal = (fees: FeeItem[]): number => {
  return fees.reduce((sum, fee) => sum + fee.amount, 0)
}

// Helper function to calculate total fees for an entire school category (e.g., Nursery)
const calculateCategoryTotal = (classLevels: ClassLevel[]): number => {
  return classLevels.reduce((sum, classLevel) => sum + calculateClassLevelTotal(classLevel.fees), 0)
}

// Helper function to calculate the grand total for all school levels
const calculateGrandTotal = (schoolCategories: SchoolCategory[]): number => {
  return schoolCategories.reduce((sum, category) => sum + calculateCategoryTotal(category.classLevels), 0)
}

const SchoolFees: React.FC = () => {
  const grandTotal = calculateGrandTotal(schoolFeesData)
  // State to keep track of which class levels are currently open
  const [openItems, setOpenItems] = useState<string[]>([])

  // Function to toggle the open/closed state of an accordion item
  const handleToggle = (id: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id) ? prevOpenItems.filter((item) => item !== id) : [...prevOpenItems, id],
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>School Fees Structure</h1>

      {schoolFeesData.map((category) => (
        <div key={category.id} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category.name}</h2>
          <div className={styles.customAccordion}>
            {category.classLevels.map((classLevel) => {
              const isOpen = openItems.includes(classLevel.id)
              return (
                <div key={classLevel.id} className={styles.customAccordionItem}>
                  <button
                    className={`${styles.customAccordionTrigger} ${isOpen ? styles.open : ""}`}
                    onClick={() => handleToggle(classLevel.id)}
                    aria-expanded={isOpen}
                    aria-controls={`content-${classLevel.id}`}
                  >
                    {classLevel.name}
                    {/* Chevron icon for expand/collapse indication */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.chevronIcon}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id={`content-${classLevel.id}`}
                    className={`${styles.customAccordionContent} ${isOpen ? styles.open : ""}`}
                    // Use max-height for smooth transition
                    style={{ maxHeight: isOpen ? "1000px" : "0px" }}
                  >
                    <div className={styles.feeTable}>
                      <div className={styles.tableHeaderRow}>
                        <div className={styles.tableHeaderCell}>Fee Type</div>
                        <div className={styles.tableHeaderCell}>Amount</div>
                      </div>
                      {classLevel.fees.map((fee, index) => (
                        <div key={index} className={styles.tableRow}>
                          <div className={styles.tableCell}>{fee.name}</div>
                          <div className={styles.tableCell}>{formatCurrency(fee.amount)}</div>
                        </div>
                      ))}
                      <div className={`${styles.tableRow} ${styles.totalRow}`}>
                        <div className={styles.tableCell}>Total for {classLevel.name}</div>
                        <div className={`${styles.tableCell} ${styles.totalAmount}`}>
                          {formatCurrency(calculateClassLevelTotal(classLevel.fees))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.categoryTotal}>
            <h3>Total for {category.name}:</h3>
            <span className={styles.totalAmount}>{formatCurrency(calculateCategoryTotal(category.classLevels))}</span>
          </div>
        </div>
      ))}

      <div className={styles.grandTotalSection}>
        <h2>Grand Total for All School Levels:</h2>
        <span className={styles.grandTotalAmount}>{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  )
}

export default SchoolFees
