import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface AcademicResourceLibraryProps {
  library: LibraryType
}

export const AcademicResourceLibrary: React.FC<AcademicResourceLibraryProps> = ({ library }) => {
  const features = [
    "Curriculum-aligned textbooks",
    "Past examination papers",
    "Study guides and workbooks",
    "Academic support materials",
    "Subject-specific resources",
  ]

  const recentAdditions = [
    "Advanced Placement Study Guides",
    "SAT Preparation Materials",
    "IB Diploma Programme Resources",
    "College Entrance Exam Papers",
    "Academic Writing Handbook",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Resources specifically designed to support academic success and examination preparation."
    />
  )
}
