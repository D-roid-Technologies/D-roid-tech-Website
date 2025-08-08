import type React from "react"
import { financeSectionsData, type Contribution } from "./finance-data"
import styles from "./FinanceDetail.module.css" 
import Pagination from "../../../components/Pagination/Pagination"
import { usePagination } from "../../../../utils/hooks/usePagination"

const FundingDetail: React.FC = () => {
  const sectionData = financeSectionsData.find((section) => section.id === "funding")
  const contributions = sectionData?.contributions ?? [];

  const {currentPage,setCurrentPage,totalPages,paginatedData: paginatedContributions} = usePagination(contributions,5)

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
        {sectionData.progress && (
          <div className={styles.progressBarContainer}>
            <div className={styles.progressLabels}>
              <span>Target: {sectionData.progress.target}</span>
              <span>Raised: {sectionData.progress.raised}</span>
            </div>
            <div className={styles.progressBarBackground}>
              <div className={styles.progressBarFill} style={{ width: `${sectionData.progress.value}%` }}></div>
            </div>
            <p className={styles.additionalInfo}>{sectionData.progress.value}% of target achieved</p>
          </div>
        )}
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
          <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          
          />
        </div>
      ) : (
        <div className={styles.card}>
          <p className={styles.noContributions}>No individual contributions to display for this section.</p>
        </div>
      )}
    </div>
  )
}

export default FundingDetail
