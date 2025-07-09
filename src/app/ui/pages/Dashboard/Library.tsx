import {
  ArrowLeft,
  BriefcaseIcon,
  ClockIcon,
  GraduationCapIcon,
  PaletteIcon,
  School,
  UsersIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaChild,
  FaBook,
  FaFlask,
  FaLaptop,
  FaBookOpen,
  FaMusic,
  FaNewspaper,
  FaGraduationCap,
  FaArchive,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DashboardCard } from "../../components/dashboard-card/DashboardCard";
import styles from "./DashboardContent.module.css";

type LibraryType = {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedInfo: {
    features: string[];
    services: string[];
    hours: string;
    contact: string;
  };
};

const Library: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");
  //   const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState<LibraryType | null>(
    null
  );

  const [showDescription, setShowDescription] = useState(false);

  const whatWeDoItems = [
    {
      // @ts-ignore
      icon: <FaUserGraduate />,
      title: "Library",
      description:
        "Access and manage student-related information including enrollment, profiles, academic progress, attendance, and engagement in school or organization activities",
    },
  ];

  //   const libraryTypes = [
  //     {
  //       // @ts-ignore
  //       icon: <FaBook />,
  //       title: "General Library",
  //       description:
  //         "The main library containing books, periodicals, and resources across all subjects. Serves as the central hub for research, study, and reading activities for all students and staff.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaFlask />,
  //       title: "Science Library",
  //       description:
  //         "Specialized collection focusing on scientific journals, research papers, laboratory manuals, and reference materials for physics, chemistry, biology, and other science subjects.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaLaptop />,
  //       title: "Digital Library",
  //       description:
  //         "Electronic resource center providing access to online databases, e-books, digital journals, and multimedia content. Includes computer workstations for research and digital literacy.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaBookOpen />,
  //       title: "Reference Library",
  //       description:
  //         "Non-circulating collection of encyclopedias, dictionaries, atlases, and reference materials that students use for quick consultation and research within the library premises.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaMusic />,
  //       title: "Media Library",
  //       description:
  //         "Collection of audiovisual materials including DVDs, CDs, educational videos, and multimedia resources for subjects like music, language learning, and visual arts.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaNewspaper />,
  //       title: "Periodicals Library",
  //       description:
  //         "Dedicated section for newspapers, magazines, academic journals, and current publications to keep students updated with current affairs and subject-specific developments.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaGraduationCap />,
  //       title: "Academic Resource Library",
  //       description:
  //         "Specialized collection of textbooks, curriculum guides, past examination papers, and academic support materials aligned with the school's educational programs.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaUsers />,
  //       title: "Faculty Library",
  //       description:
  //         "Professional collection for teachers and administrators including pedagogical resources, teaching materials, professional development books, and educational research publications.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaChild />,
  //       title: "Young Adult Library",
  //       description:
  //         "Age-appropriate fiction and non-fiction collection specifically curated for teenagers, including popular literature, graphic novels, and recreational reading materials.",
  //     },
  //     {
  //       // @ts-ignore
  //       icon: <FaArchive />,
  //       title: "Archives Library",
  //       description:
  //         "Repository for historical documents, school records, yearbooks, and institutional memory materials that preserve the school's heritage and provide historical context.",
  //     },
  //   ];
  const libraryTypes = [
    {
      icon: <FaBook />,
      title: "General Library",
      description:
        "The main library containing books, periodicals, and resources across all subjects. Serves as the central hub for research, study, and reading activities for all students and staff.",
      detailedInfo: {
        features: [
          "Over 50,000 books across all subjects",
          "Comfortable reading areas with natural lighting",
          "Study rooms for group discussions",
          "24/7 access for registered students",
          "Professional librarian assistance",
          "Book reservation and renewal system",
        ],
        services: [
          "Research assistance and guidance",
          "Information literacy workshops",
          "Inter-library loan services",
          "Reading programs and book clubs",
          "Academic writing support",
          "Citation and referencing help",
        ],
        hours:
          "Monday - Friday: 8:00 AM - 10:00 PM, Saturday - Sunday: 9:00 AM - 8:00 PM",
        contact: "generallib@school.edu | +1 (555) 123-4567",
      },
    },
    {
      icon: <FaFlask />,
      title: "Science Library",
      description:
        "Specialized collection focusing on scientific journals, research papers, laboratory manuals, and reference materials for physics, chemistry, biology, and other science subjects.",
      detailedInfo: {
        features: [
          "Scientific journals and research databases",
          "Laboratory manuals and protocols",
          "Equipment catalogs and technical specifications",
          "Peer-reviewed research publications",
          "Scientific software and simulation tools",
          "Specialized reference materials",
        ],
        services: [
          "Research methodology guidance",
          "Database search training",
          "Scientific writing workshops",
          "Laboratory safety resources",
          "Equipment booking system",
          "Collaboration with research departments",
        ],
        hours:
          "Monday - Friday: 7:00 AM - 11:00 PM, Saturday - Sunday: 10:00 AM - 6:00 PM",
        contact: "sciencelib@school.edu | +1 (555) 234-5678",
      },
    },
    {
      icon: <FaLaptop />,
      title: "Digital Library",
      description:
        "Electronic resource center providing access to online databases, e-books, digital journals, and multimedia content. Includes computer workstations for research and digital literacy.",
      detailedInfo: {
        features: [
          "50+ computer workstations with high-speed internet",
          "Access to premium online databases",
          "E-book collection with over 100,000 titles",
          "Digital media creation software",
          "Virtual reality learning stations",
          "Cloud storage and collaboration tools",
        ],
        services: [
          "Digital literacy training",
          "Online research tutorials",
          "Technical support and troubleshooting",
          "Digital media production assistance",
          "Virtual reality educational experiences",
          "Remote access setup for students",
        ],
        hours:
          "Monday - Friday: 6:00 AM - 12:00 AM, Saturday - Sunday: 8:00 AM - 10:00 PM",
        contact: "digitallib@school.edu | +1 (555) 345-6789",
      },
    },
    {
      icon: <FaBookOpen />,
      title: "Reference Library",
      description:
        "Non-circulating collection of encyclopedias, dictionaries, atlases, and reference materials that students use for quick consultation and research within the library premises.",
      detailedInfo: {
        features: [
          "Comprehensive encyclopedia collections",
          "Multilingual dictionaries and thesauri",
          "Historical and current atlases",
          "Statistical yearbooks and almanacs",
          "Professional and academic directories",
          "Quick reference desks throughout the space",
        ],
        services: [
          "Reference consultation services",
          "Fact-checking and verification assistance",
          "Research strategy development",
          "Citation format guidance",
          "Statistical data interpretation",
          "Subject-specific reference tours",
        ],
        hours:
          "Monday - Friday: 8:00 AM - 9:00 PM, Saturday - Sunday: 10:00 AM - 6:00 PM",
        contact: "reflib@school.edu | +1 (555) 456-7890",
      },
    },
    {
      icon: <FaMusic />,
      title: "Media Library",
      description:
        "Collection of audiovisual materials including DVDs, CDs, educational videos, and multimedia resources for subjects like music, language learning, and visual arts.",
      detailedInfo: {
        features: [
          "Audio and video production studios",
          "Musical instrument lending program",
          "Language learning software and materials",
          "Documentary and educational film collection",
          "Digital art and design workstations",
          "Soundproof practice rooms",
        ],
        services: [
          "Media production training",
          "Equipment rental and technical support",
          "Language conversation practice groups",
          "Film screening events",
          "Digital art workshops",
          "Music practice room reservations",
        ],
        hours:
          "Monday - Friday: 9:00 AM - 8:00 PM, Saturday - Sunday: 11:00 AM - 5:00 PM",
        contact: "medialib@school.edu | +1 (555) 567-8901",
      },
    },
    {
      icon: <FaNewspaper />,
      title: "Periodicals Library",
      description:
        "Dedicated section for newspapers, magazines, academic journals, and current publications to keep students updated with current affairs and subject-specific developments.",
      detailedInfo: {
        features: [
          "Current and back issues of major newspapers",
          "Academic journals across all disciplines",
          "Popular magazines and trade publications",
          "Digital newspaper archives",
          "International publications",
          "Microfilm and microfiche collections",
        ],
        services: [
          "Current awareness services",
          "Article delivery and scanning",
          "Newspaper clipping services",
          "Trend analysis and monitoring",
          "Subscription recommendations",
          "Digital archive training",
        ],
        hours:
          "Monday - Friday: 7:00 AM - 10:00 PM, Saturday - Sunday: 9:00 AM - 7:00 PM",
        contact: "periodicals@school.edu | +1 (555) 678-9012",
      },
    },
    {
      icon: <FaGraduationCap />,
      title: "Academic Resource Library",
      description:
        "Specialized collection of textbooks, curriculum guides, past examination papers, and academic support materials aligned with the school's educational programs.",
      detailedInfo: {
        features: [
          "Course textbooks and supplementary materials",
          "Past examination papers and solutions",
          "Curriculum guides and syllabi",
          "Academic writing resources",
          "Study guides and test preparation materials",
          "Faculty-recommended reading lists",
        ],
        services: [
          "Academic advising and planning",
          "Study skills workshops",
          "Exam preparation sessions",
          "Tutoring service coordination",
          "Academic integrity education",
          "Course material reservations",
        ],
        hours:
          "Monday - Friday: 8:00 AM - 10:00 PM, Saturday - Sunday: 10:00 AM - 8:00 PM",
        contact: "academic@school.edu | +1 (555) 789-0123",
      },
    },
    {
      icon: <FaUsers />,
      title: "Faculty Library",
      description:
        "Professional collection for teachers and administrators including pedagogical resources, teaching materials, professional development books, and educational research publications.",
      detailedInfo: {
        features: [
          "Teaching methodology and pedagogy resources",
          "Professional development materials",
          "Educational research journals",
          "Curriculum design resources",
          "Assessment and evaluation tools",
          "Administrative and policy documents",
        ],
        services: [
          "Professional development workshops",
          "Research collaboration support",
          "Grant writing assistance",
          "Teaching resource development",
          "Policy and procedure guidance",
          "Faculty reading groups",
        ],
        hours:
          "Monday - Friday: 7:00 AM - 9:00 PM, Saturday: 10:00 AM - 4:00 PM",
        contact: "faculty@school.edu | +1 (555) 890-1234",
      },
    },
    {
      icon: <FaChild />,
      title: "Young Adult Library",
      description:
        "Age-appropriate fiction and non-fiction collection specifically curated for teenagers, including popular literature, graphic novels, and recreational reading materials.",
      detailedInfo: {
        features: [
          "Young adult fiction and non-fiction",
          "Graphic novels and manga collection",
          "Gaming and entertainment area",
          "Creative writing and arts space",
          "Technology and coding resources",
          "Comfortable lounge seating areas",
        ],
        services: [
          "Book clubs and reading circles",
          "Creative writing workshops",
          "Gaming tournaments and events",
          "Teen leadership programs",
          "College preparation resources",
          "Peer tutoring coordination",
        ],
        hours:
          "Monday - Friday: 3:00 PM - 9:00 PM, Saturday - Sunday: 12:00 PM - 8:00 PM",
        contact: "youngadult@school.edu | +1 (555) 901-2345",
      },
    },
    {
      icon: <FaArchive />,
      title: "Archives Library",
      description:
        "Repository for historical documents, school records, yearbooks, and institutional memory materials that preserve the school's heritage and provide historical context.",
      detailedInfo: {
        features: [
          "Historical documents and manuscripts",
          "School yearbooks and publications",
          "Institutional records and reports",
          "Alumni archives and collections",
          "Photographic and audiovisual history",
          "Climate-controlled preservation facilities",
        ],
        services: [
          "Historical research assistance",
          "Document digitization services",
          "Genealogy and family history research",
          "Archival training and workshops",
          "Preservation and conservation advice",
          "Historical exhibitions and displays",
        ],
        hours:
          "Monday - Friday: 9:00 AM - 5:00 PM, Saturday: 10:00 AM - 3:00 PM",
        contact: "archives@school.edu | +1 (555) 012-3456",
      },
    },
  ];

  const handleLibraryClick = (library: LibraryType) => {
    setSelectedLibrary(library);
    setShowDescription(true);
    setShowContent(false);
  };

  const handleBackToLibraries = () => {
    setShowDescription(false);
    setShowContent(true);
  };
  return (
    <div>
      <section className="welcome-section">
        {/* <h2 className="welcome-section-heading">What We Do</h2> */}
        <div className="cards-grid cards-grid-3">
          {showContentMain && (
            <>
              {whatWeDoItems.map((item, index) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    // alert(`${item.title}`)
                    setShowContent(true);
                    setShowContentMain(false);
                    setShowTitle(`${item.title}`);
                    setShowDesc(`${item.description}`);
                  }}
                >
                  <DashboardCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {showContent && (
          <>
            <button
              className={styles.backButton}
              onClick={() => {
                setShowContent(false);
                setShowContentMain(true);
              }}
            >
              {/* @ts-ignore */}
              {/* <IoMdArrowRoundBack /> */}
              Back to Classroom
            </button>
            <div>
              <h3 style={{ color: "#000000" }}>{showTitle}</h3>
              <p style={{ color: "#000000" }}>{showDesc}</p>
              <div className="cards-grid cards-grid-3">
                {libraryTypes.map((item, index) => (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLibraryClick(item)}
                  >
                    <DashboardCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
              {/* <p style={{ color: "#000000" }}>This is the show content</p> */}
            </div>
          </>
        )}

        {/* Individual Library Description Page */}
        {showDescription && selectedLibrary && (
          <section>
            <button className="back-button" onClick={handleBackToLibraries}>
              <ArrowLeft size={16} />
              Back to Libraries
            </button>

            <div className="library-detail-container">
              <div className="library-detail-header">
                <div className="library-detail-icon">
                  {selectedLibrary.icon}
                </div>
                <div>
                  <h1 className="library-detail-title">
                    {selectedLibrary.title}
                  </h1>
                  <p className="library-detail-description">
                    {selectedLibrary.description}
                  </p>
                </div>
              </div>

              <div className="library-detail-grid">
                <div className="library-detail-section">
                  <h3>Features & Resources</h3>
                  <ul className="library-detail-list">
                    {selectedLibrary.detailedInfo.features.map(
                      (feature, index) => (
                        <li key={index}>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="library-detail-section">
                  <h3>Services Offered</h3>
                  <ul className="library-detail-list">
                    {selectedLibrary.detailedInfo.services.map(
                      (service, index) => (
                        <li key={index}>
                          <span>{service}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="contact-info-grid">
                <div className="contact-info-item">
                  <h3>Operating Hours</h3>
                  <p>{selectedLibrary.detailedInfo.hours}</p>
                </div>

                <div className="contact-info-item">
                  <h3>Contact Information</h3>
                  <p>{selectedLibrary.detailedInfo.contact}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Library;

//   <div className="library-description">
//     <button
//       className={styles.backButton}
//       onClick={handleBackToLibraries}
//     >
//       {/* @ts-ignore */}
//       <IoMdArrowRoundBack /> Back to Libraries
//     </button>
