export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface ValidationErrors {
  [key: string]: string
}

export const validateForm = (data: Record<string, string>, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {}

  Object.keys(rules).forEach((field) => {
    const value = data[field] || ""
    const rule = rules[field]

    if (rule.required && !value.trim()) {
      errors[field] = "This field is required"
      return
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `Minimum length is ${rule.minLength} characters`
      return
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `Maximum length is ${rule.maxLength} characters`
      return
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = "Invalid format"
      return
    }

    if (value && rule.custom && !rule.custom(value)) {
      errors[field] = "Invalid value"
      return
    }
  })

  return errors
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phonePattern = /^\+?[\d\s\-$$$$]+$/
