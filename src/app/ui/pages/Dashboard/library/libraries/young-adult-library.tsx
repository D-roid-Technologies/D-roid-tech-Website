import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface YoungAdultLibraryProps {
  library: LibraryType
}

export const YoungAdultLibrary: React.FC<YoungAdultLibraryProps> = ({ library }) => {
  const features = [
    "Age-appropriate fiction and non-fiction",
    "Popular literature and bestsellers",
    "Graphic novels and comics",
    "Recreational reading materials",
    "Book club selections",
  ]

  const recentAdditions = [
    "The Seven Husbands of Evelyn Hugo",
    "Percy Jackson: The Complete Series",
    "Wonder by R.J. Palacio",
    "The Hate U Give by Angie Thomas",
    "Dune: The Graphic Novel Adaptation",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Engaging literature collection designed to foster a love of reading among teenagers."
    />
  )
}
