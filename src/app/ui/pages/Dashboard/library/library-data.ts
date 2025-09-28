export interface LibraryStats {
  totalItems: number
  availableItems: number
  checkedOut: number
  reserved: number
}
export interface LibraryType {
  id?: string;
  name?: string;
  shortDescription?: string;
  stats? : LibraryStats;
  icon: React.ReactNode | string;
  title?: string;
  description?: string;
  detailedInfo?: {
    features: string[];
    services: string[];
    hours: string;
    contact: string;
  };
};

export const libraryData: LibraryType[] = [
  {
    id: "general",
    name: "General Library",
    description:
      "The main library containing books, periodicals, and resources across all subjects. Serves as the central hub for research, study, and reading activities for all students and staff.",
    shortDescription: "Main library with comprehensive resources across all subjects",
    icon: "📚",
    stats: {
      totalItems: 15420,
      availableItems: 12890,
      checkedOut: 2100,
      reserved: 430,
    },
  },
  {
    id: "science",
    name: "Science Library",
    description:
      "Specialized collection focusing on scientific journals, research papers, laboratory manuals, and reference materials for physics, chemistry, biology, and other science subjects.",
    shortDescription: "Scientific journals, research papers, and laboratory resources",
    icon: "🔬",
    stats: {
      totalItems: 8750,
      availableItems: 7200,
      checkedOut: 1350,
      reserved: 200,
    },
  },
  {
    id: "digital",
    name: "Digital Library",
    description:
      "Electronic resource center providing access to online databases, e-books, digital journals, and multimedia content. Includes computer workstations for research and digital literacy.",
    shortDescription: "Electronic resources, e-books, and digital content",
    icon: "💻",
    stats: {
      totalItems: 25600,
      availableItems: 25600,
      checkedOut: 0,
      reserved: 0,
    },
  },
  {
    id: "reference",
    name: "Reference Library",
    description:
      "Non-circulating collection of encyclopedias, dictionaries, atlases, and reference materials for quick consultation and research within the library premises.",
    shortDescription: "Encyclopedias, dictionaries, and reference materials",
    icon: "📖",
    stats: {
      totalItems: 3200,
      availableItems: 3200,
      checkedOut: 0,
      reserved: 0,
    },
  },
  {
    id: "media",
    name: "Media Library",
    description:
      "Collection of audiovisual materials including DVDs, CDs, educational videos, and multimedia resources for subjects like music, language learning, and visual arts.",
    shortDescription: "Audiovisual materials and multimedia resources",
    icon: "🎬",
    stats: {
      totalItems: 4500,
      availableItems: 3800,
      checkedOut: 650,
      reserved: 50,
    },
  },
  {
    id: "periodicals",
    name: "Periodicals Library",
    description:
      "Dedicated section for newspapers, magazines, academic journals, and current publications to keep students updated with current affairs and subject-specific developments.",
    shortDescription: "Newspapers, magazines, and current publications",
    icon: "📰",
    stats: {
      totalItems: 2800,
      availableItems: 2650,
      checkedOut: 120,
      reserved: 30,
    },
  },
  {
    id: "academic",
    name: "Academic Resource Library",
    description:
      "Specialized collection of textbooks, curriculum guides, past examination papers, and academic support materials aligned with the school's educational programs.",
    shortDescription: "Textbooks, exam papers, and academic support materials",
    icon: "🎓",
    stats: {
      totalItems: 6800,
      availableItems: 5200,
      checkedOut: 1400,
      reserved: 200,
    },
  },
  {
    id: "faculty",
    name: "Faculty Library",
    description:
      "Professional collection for teachers and administrators including pedagogical resources, teaching materials, professional development books, and educational research publications.",
    shortDescription: "Professional resources for teachers and administrators",
    icon: "👨‍🏫",
    stats: {
      totalItems: 2100,
      availableItems: 1850,
      checkedOut: 220,
      reserved: 30,
    },
  },
  {
    id: "young-adult",
    name: "Young Adult Library",
    description:
      "Age-appropriate fiction and non-fiction collection for teenagers, including popular literature, graphic novels, and recreational reading materials.",
    shortDescription: "Teen fiction, graphic novels, and recreational reading",
    icon: "📚",
    stats: {
      totalItems: 5400,
      availableItems: 4100,
      checkedOut: 1200,
      reserved: 100,
    },
  },
  {
    id: "archives",
    name: "Archives Library",
    description:
      "Repository for historical documents, school records, yearbooks, and institutional memory materials preserving the school's heritage.",
    shortDescription: "Historical documents and institutional archives",
    icon: "📜",
    stats: {
      totalItems: 1800,
      availableItems: 1800,
      checkedOut: 0,
      reserved: 0,
    },
  },
]
