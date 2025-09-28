import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface ArchivesLibraryProps {
  library: LibraryType
}

export const ArchivesLibrary: React.FC<ArchivesLibraryProps> = ({ library }) => {
  const features = [
    "Historical documents and records",
    "School yearbooks and publications",
    "Institutional memory materials",
    "Alumni records and achievements",
    "Heritage preservation collection",
  ]

  const recentAdditions = [
    "Digital Archive of School Newspapers",
    "Alumni Achievement Records 2024",
    "Historical Photographs Collection",
    "Founding Documents Digitization",
    "Oral History Project Recordings",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Preserving institutional history and heritage for future generations."
    />
  )
}
