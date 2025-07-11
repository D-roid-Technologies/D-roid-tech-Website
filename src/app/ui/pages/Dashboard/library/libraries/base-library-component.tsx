import type React from "react"
import type { LibraryType } from "../library-data"
import "./base-library-component.css"

interface BaseLibraryComponentProps {
  library: LibraryType
  features: string[]
  recentAdditions: string[]
  specialNote: string
}

export const BaseLibraryComponent: React.FC<BaseLibraryComponentProps> = ({
  library,
  features,
  recentAdditions,
  specialNote,
}) => {
  return (
    <div className="base-library">
      <div className="library-stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">{library.stats?.totalItems}</h3>
            <p className="stat-label">Total Items</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{library.stats?.availableItems}</h3>
            <p className="stat-label">Available</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{library.stats?.checkedOut}</h3>
            <p className="stat-label">Checked Out</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{library.stats?.reserved}</h3>
            <p className="stat-label">Reserved</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="features-section">
          <h3 className="section-title">Key Features</h3>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-bullet">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="recent-additions-section">
          <h3 className="section-title">Recent Additions</h3>
          <ul className="additions-list">
            {recentAdditions.map((addition, index) => (
              <li key={index} className="addition-item">
                <span className="addition-bullet">+</span>
                {addition}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="special-note">
        <div className="note-content">
          <span className="note-icon">ℹ️</span>
          <p className="note-text">{specialNote}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button className="action-button primary">Browse Collection</button>
        <button className="action-button secondary">Request Item</button>
        <button className="action-button secondary">View Hours</button>
      </div>
    </div>
  )
}
