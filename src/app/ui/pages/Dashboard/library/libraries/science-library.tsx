import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface ScienceLibraryProps {
  library: LibraryType
}

export const ScienceLibrary: React.FC<ScienceLibraryProps> = ({ library }) => {
  const features = [
    "Scientific journals and research papers",
    "Laboratory manuals and protocols",
    "Reference materials for all science subjects",
    "Access to scientific databases",
    "Equipment manuals and safety guides",
  ]

  const recentAdditions = [
    "Advanced Organic Chemistry - 8th Edition",
    "Molecular Biology of the Cell",
    "Physics for Scientists and Engineers",
    "Biochemistry: Concepts and Connections",
    "Environmental Chemistry Principles",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Specialized resources for physics, chemistry, biology, and interdisciplinary science studies."
    />
  )
}
