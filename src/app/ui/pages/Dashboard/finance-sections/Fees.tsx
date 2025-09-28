import type React from "react"
import { financeSectionsData, type Contribution } from "./finance-data"
import styles from "./FinanceDetail.module.css" // Reusing a common CSS module
import { usePagination } from "../../../../utils/hooks/usePagination"
import Pagination from "../../../components/Pagination/Pagination"
import SchoolFees from "./SchoolFees"
const FeesDetail: React.FC = () => {
  const sectionData = financeSectionsData.find((section) => section.id === "fees")
const contributions = sectionData?.contributions ?? [];
const {currentPage,totalPages,setCurrentPage,paginatedData : paginatedContributions} = usePagination(contributions,15)
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
          <span className={styles.currentValue}>{sectionData.currentValue}</span>
          {sectionData.statusBadge && (
            <span className={`${styles.statusBadge} ${styles[sectionData.statusBadge.type]}`}>
              {sectionData.statusBadge.text}
            </span>
          )}
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
                {paginatedContributions.map((item) => (
                  <tr key={item.id} className={styles.tableRow}>
                    {headers.map((key) => (
                      <td key={key} className={styles.tableCell}>
                        {typeof item[key] === "number" ? `₦${item[key].toFixed(2)}` : item[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
          <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          />
          </div>
          <SchoolFees/>
        </div>
      ) : (
        <div className={styles.card}>
          <p className={styles.noContributions}>No individual contributions to display for this section.</p>
        </div>
      )}
    </div>
  )
}

export default FeesDetail
