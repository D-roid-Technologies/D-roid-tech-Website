"use client"

// Slider component
import type React from "react"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
  id?: string
  disabled?: boolean
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  id,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([Number.parseInt(e.target.value)])
  }

  return (
    <div className={`wt-slider ${className}`}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        disabled={disabled}
        className="wt-slider__input"
      />
      <div className="wt-slider__track">
        <div className="wt-slider__fill" style={{ width: `${((value[0] - min) / (max - min)) * 100}%` }} />
      </div>
    </div>
  )
}

export default Slider
