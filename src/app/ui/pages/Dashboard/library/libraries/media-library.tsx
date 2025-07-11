import type React from "react"
import type { LibraryType } from "../library-data"
import { BaseLibraryComponent } from "./base-library-component"

interface MediaLibraryProps {
  library: LibraryType
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ library }) => {
  const features = [
    "Educational DVDs and documentaries",
    "Music CDs and audio resources",
    "Language learning materials",
    "Visual arts and multimedia content",
    "Audio-visual equipment for viewing",
  ]

  const recentAdditions = [
    "BBC Nature Documentary Collection",
    "Classical Music Masterpieces",
    "Foreign Language Conversation CDs",
    "Art History Visual Guide",
    "Science Experiment Video Series",
  ]

  return (
    <BaseLibraryComponent
      library={library}
      features={features}
      recentAdditions={recentAdditions}
      specialNote="Multimedia resources to enhance learning through visual and auditory experiences."
    />
  )
}
