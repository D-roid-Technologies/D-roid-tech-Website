import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface FacultyLibraryProps {
  library: LibraryType
}

export const FacultyLibrary: React.FC<FacultyLibraryProps> = ({ library }) => {
  const features = [
    "Pedagogical resources and teaching materials",
    "Professional development books",
    "Educational research publications",
    "Curriculum development guides",
    "Administrative resources",
  ]

  const recentAdditions = [
    "Modern Teaching Methodologies",
    "Educational Technology Integration",
    "Classroom Management Strategies",
    "Assessment and Evaluation Techniques",
    "Professional Learning Communities",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Exclusive resources for faculty members to enhance teaching effectiveness and professional growth."
    />
  )
}
