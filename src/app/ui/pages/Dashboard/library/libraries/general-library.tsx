import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface GeneralLibraryProps {
  library: LibraryType
}

export const GeneralLibrary: React.FC<GeneralLibraryProps> = ({ library }) => {
  const features = [
    "Comprehensive book collection across all subjects",
    "Study areas and reading rooms",
    "Research assistance services",
    "Inter-library loan system",
    "Book reservation system",
  ]

  const recentAdditions = [
    "Introduction to Modern Psychology - 3rd Edition",
    "World History: A Global Perspective",
    "Advanced Mathematics for Engineers",
    "Contemporary Literature Anthology",
    "Environmental Science Handbook",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="The General Library serves as the main hub for all academic activities and houses the largest collection of resources."
    />
  )
}
