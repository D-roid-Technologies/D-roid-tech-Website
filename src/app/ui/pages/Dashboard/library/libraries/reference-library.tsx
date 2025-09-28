import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface ReferenceLibraryProps {
  library: LibraryType
}

export const ReferenceLibrary: React.FC<ReferenceLibraryProps> = ({ library }) => {
  const features = [
    "Encyclopedias and dictionaries",
    "Atlases and geographical references",
    "Statistical yearbooks and almanacs",
    "Quick consultation materials",
    "In-library use only resources",
  ]

  const recentAdditions = [
    "Encyclopedia Britannica - Latest Edition",
    "Oxford English Dictionary Complete Set",
    "World Atlas of Geography",
    "Statistical Abstract 2024",
    "Biographical Dictionary of Scientists",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="All reference materials are for in-library use only to ensure availability for all students."
    />
  )
}
