"use client"

import type React from "react"
import { useState } from "react"
import type { LibraryType } from "./library-data"
import { GenericLibrarySection } from "./generic-library-section"
import {
  generalLibraryConfig,
  scienceLibraryConfig,
  digitalLibraryConfig,
  generalLibraryData,
  scienceLibraryData,
  digitalLibraryData,
} from "./library-configs"

interface EnhancedLibraryDetailProps {
  library: LibraryType
  onBack: () => void
}

export const EnhancedLibraryDetail: React.FC<EnhancedLibraryDetailProps> = ({ library, onBack }) => {
  const [libraryData, setLibraryData] = useState(() => {
    // Initialize with sample data based on library type
    switch (library.id) {
      case "general":
        return generalLibraryData
      case "science":
        return scienceLibraryData
      case "digital":
        return digitalLibraryData
      default:
        return []
    }
  })

  const getLibraryConfig = () => {
    switch (library.id) {
      case "general":
        return generalLibraryConfig
      case "science":
        return scienceLibraryConfig
      case "digital":
        return digitalLibraryConfig
      default:
        return generalLibraryConfig // fallback
    }
  }

  const handleDataChange = (newData: any[]) => {
    setLibraryData(newData)
    // Here you could also sync with a backend API
    console.log(`${library.name} data updated:`, newData)
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

      <div className="library-content">
        <GenericLibrarySection config={getLibraryConfig()} initialData={libraryData} onDataChange={handleDataChange} />
      </div>

      <style >{`
        .library-detail {
          animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .detail-header {
          margin-bottom: 2rem;
        }
        .back-button {
          background: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .back-button:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
          color: #2d3748;
        }
        .library-header-info {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .library-icon-large {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #071d6a 0%, #071d6a 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .icon-text-large {
          font-size: 2rem;
        }
        .library-header-text {
          flex: 1;
        }
        .library-name {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .library-description {
          font-size: 1.1rem;
          color: #4a5568;
          line-height: 1.6;
          max-width: 800px;
        }
        .library-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 2rem;
        }
        @media (max-width: 768px) {
          .library-header-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .library-name {
            font-size: 1.75rem;
          }
          .library-description {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .library-icon-large {
            width: 60px;
            height: 60px;
          }
          .icon-text-large {
            font-size: 1.5rem;
          }
          .library-name {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
