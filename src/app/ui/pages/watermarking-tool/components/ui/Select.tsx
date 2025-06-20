"use client"

// Select components
import type React from "react"

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className = "", disabled = false }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`wt-select ${className}`}
      disabled={disabled}
    >
      {children}
    </select>
  )
}

export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>
export const SelectValue: React.FC = () => null
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>
export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => <option value={value}>{children}</option>
