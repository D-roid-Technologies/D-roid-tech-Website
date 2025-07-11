"use client"

import type React from "react"
import type { LibraryType } from "./library-data"
import "./library-card.css"

interface LibraryCardProps {
  library: LibraryType
  onSelect: (library: LibraryType) => void
}

export const LibraryCard: React.FC<LibraryCardProps> = ({ library, onSelect }) => {
  return (
    <div
      className="library-card"
      onClick={() => onSelect(library)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(library)
        }
      }}
    >
      <div className="library-icon">
        <span className="icon-text">{library.icon}</span>
      </div>
      <h3 className="library-title">{library.name}</h3>
      <p className="library-summary">{library.shortDescription}</p>
      <div className="library-stats">
        <span className="stat-item">
          <strong>{library.stats?.totalItems}</strong> Items
        </span>
        <span className="stat-item">
          <strong>{library.stats?.availableItems}</strong> Available
        </span>
      </div>
      <div className="card-footer">
        <span className="view-details">Click to view details →</span>
      </div>
    </div>
  )
}
