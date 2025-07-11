"use client"

import type React from "react"
import type { LibraryType } from "./library-data"
import { GeneralLibrary } from "./libraries/general-library"
import { ScienceLibrary } from "./libraries/science-library"
import { DigitalLibrary } from "./libraries/digital-library"
import { ReferenceLibrary } from "./libraries/reference-library"
import { MediaLibrary } from "./libraries/media-library"
import { PeriodicalsLibrary } from "./libraries/periodicals-library"
import { AcademicResourceLibrary } from "./libraries/academic-resource-library"
import { FacultyLibrary } from "./libraries/faculty-library"
import { YoungAdultLibrary } from "./libraries/young-adult-library"
import { ArchivesLibrary } from "./libraries/archives-library"
import "./library-detail.css" // This CSS styles the header and back button of the detail page

interface LibraryDetailProps {
  library: LibraryType
  onBack: () => void
}

export const LibraryDetail: React.FC<LibraryDetailProps> = ({ library, onBack }) => {
  const renderLibraryComponent = () => {
    switch (library.id) {
      case "general":
        return <GeneralLibrary library={library} />
      case "science":
        return <ScienceLibrary library={library} />
      case "digital":
        return <DigitalLibrary library={library} />
      case "reference":
        return <ReferenceLibrary library={library} />
      case "media":
        return <MediaLibrary library={library} />
      case "periodicals":
        return <PeriodicalsLibrary library={library} />
      case "academic":
        return <AcademicResourceLibrary library={library} />
      case "faculty":
        return <FacultyLibrary library={library} />
      case "young-adult":
        return <YoungAdultLibrary library={library} />
      case "archives":
        return <ArchivesLibrary library={library} />
      default:
        return <div>Library component not found</div>
    }
  }

  return (
    <div className="library-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBack} aria-label="Back to library grid">
          ← Back to Libraries
        </button>
        <div className="library-header-info">
          <div className="library-icon-large">
            <span className="icon-text-large">{library.icon}</span>
          </div>
          <div className="library-header-text">
            <h1 className="library-name">{library.name}</h1>
            <p className="library-description">{library.description}</p>
          </div>
        </div>
      </div>

      <div className="library-content">{renderLibraryComponent()}</div>
    </div>
  )
}
