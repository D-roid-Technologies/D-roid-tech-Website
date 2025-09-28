import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface PeriodicalsLibraryProps {
  library: LibraryType
}

export const PeriodicalsLibrary: React.FC<PeriodicalsLibraryProps> = ({ library }) => {
  const features = [
    "Daily newspapers and magazines",
    "Academic and research journals",
    "Current affairs publications",
    "Subject-specific periodicals",
    "Archive of back issues",
  ]

  const recentAdditions = [
    "Scientific American - Current Issues",
    "National Geographic Magazine",
    "The Economist Weekly",
    "Journal of Educational Psychology",
    "Technology Review Magazine",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Stay updated with current events and latest developments in various fields."
    />
  )
}
