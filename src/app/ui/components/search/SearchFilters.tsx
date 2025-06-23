"use client"

import type React from "react"
import "./SearchFilters.css"

interface SearchFiltersProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  showPremiumOnly: boolean
  onPremiumToggle: (showPremium: boolean) => void
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  showPremiumOnly,
  onPremiumToggle,
}) => {
  return (
    <div className="search-filters">
      {/* Category Filter */}
      <div className="tools-category-filters">
        <button
          onClick={() => onCategoryChange("All")}
          className={`filter-button ${selectedCategory === "All" ? "on" : ""}`}
        >
          All Tools
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`filter-button ${selectedCategory === category ? "on" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Premium Filter */}
      <label className="premium-filter">
        <input
          type="checkbox"
          checked={showPremiumOnly}
          onChange={(e) => onPremiumToggle(e.target.checked)}
          className="premium-checkbox"
        />
        <span className="premium-label">Premium Only</span>
      </label>
    </div>
  )
}

export default SearchFilters
