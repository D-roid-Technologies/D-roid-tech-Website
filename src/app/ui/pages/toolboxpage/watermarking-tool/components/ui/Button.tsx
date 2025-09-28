// Button component
import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "danger"
  size?: "sm" | "md" | "lg" | "icon"
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  children,
  ...props
}) => {
  const baseClasses = "wt-btn"
  const variantClasses = {
    primary: "wt-btn--primary",
    outline: "wt-btn--outline",
    secondary: "wt-btn--secondary",
    danger: "wt-btn--danger",
  }
  const sizeClasses = {
    sm: "wt-btn--sm",
    md: "wt-btn--md",
    lg: "wt-btn--lg",
    icon: "wt-btn--icon",
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "wt-btn--full" : "",
    loading ? "wt-btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="wt-btn__spinner" />}
      <span className={loading ? "wt-btn__content--loading" : "wt-btn__content"}>{children}</span>
    </button>
  )
}

export default Button
