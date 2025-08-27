"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import styles from "../../pages/Dashboard/components.module.css"

interface Option {
  value: string
  label: string
}

interface CustomDropdownProps {
  options: Option[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  multiple?: boolean
  required?: boolean
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  multiple = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue]
      onChange(newValues)
    } else {
      onChange(optionValue)
      setIsOpen(false)
    }
  }

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder
      if (value.length === 1) {
        const option = options.find((opt) => opt.value === value[0])
        return option?.label || value[0]
      }
      return `${value.length} selected`
    } else {
      const option = options.find((opt) => opt.value === value)
      return option?.label || placeholder
    }
  }

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue)
    }
    return value === optionValue
  }

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div  className={`${styles.input} ${styles.dropdownButton}`} onClick={() => setIsOpen(!isOpen)}>
        <span
          className={
            value && (Array.isArray(value) ? value.length > 0 : value)
              ? styles.dropdownValueSelected
              : styles.dropdownValuePlaceholder
          }
        >
          {getDisplayValue()}
        </span>
        <ChevronDown size={16} className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownIconOpen : ""}`} />
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownOption} ${isSelected(option.value) ? styles.dropdownOptionSelected : ""}`}
              onClick={() => handleOptionClick(option.value)}
            >
              <span>{option.label}</span>
              {multiple && isSelected(option.value) && <span className={styles.dropdownCheckmark}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
