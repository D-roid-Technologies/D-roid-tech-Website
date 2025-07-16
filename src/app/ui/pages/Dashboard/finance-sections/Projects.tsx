import type React from "react"
import { financeSectionsData, type Contribution } from "./finance-data"
import styles from "./FinanceDetail.module.css" // Reusing a common CSS module
import { Tag } from "lucide-react"

const ProjectsDetail: React.FC = () => {
  const sectionData = financeSectionsData.find((section) => section.id === "projects")

  if (!sectionData) {
    return <div className={styles.error}>Section data not found.</div>
  }

  const getTableHeaders = (contributions: Contribution[]) => {
    if (!contributions || contributions.length === 0) return []
    return Object.keys(contributions[0]).filter((key) => key !== "id")
  }

  const headers = getTableHeaders(sectionData.contributions)

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{sectionData.title} Overview</h1>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Overview</h2>
        <p className={styles.cardDescription}>{sectionData.description}</p>
        <div className={styles.overviewContent}>
          <ul className={styles.projectList}>
            {sectionData.contributions.map((project) => (
              <li key={project.id} className={styles.projectItem}>
                <span>
                  <Tag className={styles.icon} /> {project.project}
                </span>
                <span className={styles.amount}>
                  Budget: ${project.budget.toLocaleString()} | Spent: ${project.spent.toLocaleString()} (Status:{" "}
                  {project.status})
                </span>
              </li>
            ))}
          </ul>
        </div>
        {sectionData.additionalInfo && <p className={styles.additionalInfo}>{sectionData.additionalInfo}</p>}
      </div>

      {sectionData.contributions && sectionData.contributions.length > 0 ? (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Individual Contributions</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header} className={styles.tableHeader}>
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectionData.contributions.map((item) => (
                  <tr key={item.id} className={styles.tableRow}>
                    {headers.map((key) => (
                      <td key={key} className={styles.tableCell}>
                        {typeof item[key] === "number" &&
                        !key.toLowerCase().includes("budget") &&
                        !key.toLowerCase().includes("spent")
                          ? `$${item[key].toFixed(2)}`
                          : item[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <p className={styles.noContributions}>No individual contributions to display for this section.</p>
        </div>
      )}
    </div>
  )
}

export default ProjectsDetail
