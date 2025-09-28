"use client"

import type React from "react"
import { useState } from "react"
import { LibraryCard } from "./library-card"
import { LibraryDetail } from "./library-detail"
import { libraryData, type LibraryType } from "./library-data"
import "./library-dashboard.css"

export const LibraryDashboard: React.FC = () => {
  const [selectedLibrary, setSelectedLibrary] = useState<LibraryType | null>(null)

  const handleLibrarySelect = (library: LibraryType) => {
    setSelectedLibrary(library)
  }

  const handleBackToGrid = () => {
    setSelectedLibrary(null)
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Digital Library System</h1>
        <p className="dashboard-subtitle">
          Access comprehensive educational resources across multiple specialized libraries
        </p>
      </header>

      {!selectedLibrary ? (
        <div className="libraries-grid">
          {libraryData.map((library) => (
            <LibraryCard key={library.id} library={library} onSelect={handleLibrarySelect} />
          ))}
        </div>
      ) : (
        <LibraryDetail library={selectedLibrary} onBack={handleBackToGrid} />
      )}
    </div>
  )
}
