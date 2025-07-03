"use client"

import type React from "react"
import { Search, X } from "lucide-react"
import componentStyles from "../components.module.css"

interface FilterOption {
  label: string
  value: string
}

interface SearchFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filterValue: string
  onFilterChange: (value: string) => void
  filterOptions: FilterOption[]
  placeholder?: string
  filterLabel?: string
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  placeholder = "Search...",
  filterLabel = "Filter",
}) => {
  const clearSearch = () => {
    onSearchChange("")
  }

  const clearFilter = () => {
    onFilterChange("")
  }

  return (
    <div className={componentStyles.inputGroup}>
      <div className={componentStyles.searchContainer}>
        <Search className={componentStyles.searchIcon} />
        <input
          className={`${componentStyles.input} ${componentStyles.searchInput}`}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchValue && (
          <button
            className={componentStyles.actionButton}
            onClick={clearSearch}
            style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)" }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className={componentStyles.filterContainer}>
        <select
          className={componentStyles.select}
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          style={{ minWidth: "150px" }}
        >
          <option value="">{filterLabel}</option>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {filterValue && (
          <button
            className={`${componentStyles.button} ${componentStyles.buttonSecondary} ${componentStyles.buttonSmall}`}
            onClick={clearFilter}
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
