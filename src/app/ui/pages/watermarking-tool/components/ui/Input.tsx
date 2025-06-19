// Input component
import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input: React.FC<InputProps> = ({ className = "", error = false, helperText, ...props }) => {
  return (
    <div className="wt-input-wrapper">
      <input className={`wt-input ${error ? "wt-input--error" : ""} ${className}`} {...props} />
      {helperText && <span className={`wt-input__helper ${error ? "wt-input__helper--error" : ""}`}>{helperText}</span>}
    </div>
  )
}

export default Input
