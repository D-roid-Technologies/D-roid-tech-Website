"use client"

import type React from "react"
import { Search, X } from "lucide-react"
import "./SearchBar.css"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search...", className = "" }) => {
  const handleClear = () => {
    onChange("")
  }

  return (
    <div className={`search-container ${className}`}>
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {value && (
          <button onClick={handleClear} className="clear-button" aria-label="Clear search">
            <X />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
