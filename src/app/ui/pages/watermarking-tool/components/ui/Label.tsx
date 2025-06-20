// Label component
import type React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label: React.FC<LabelProps> = ({ className = "", required = false, children, ...props }) => (
  <label className={`wt-label ${className}`} {...props}>
    {children}
    {required && <span className="wt-label__required">*</span>}
  </label>
)

export default Label
