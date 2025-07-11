import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface DigitalLibraryProps {
  library: LibraryType
}

export const DigitalLibrary: React.FC<DigitalLibraryProps> = ({ library }) => {
  const features = [
    "Online databases and e-journals",
    "Digital books and multimedia content",
    "Computer workstations for research",
    "Digital literacy training programs",
    "24/7 online access to resources",
  ]

  const recentAdditions = [
    "IEEE Digital Library Access",
    "Nature Journal Online Collection",
    "Interactive Science Simulations",
    "Digital Art and Design Resources",
    "Online Language Learning Platform",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Access digital resources anytime, anywhere with your student credentials."
    />
  )
}
