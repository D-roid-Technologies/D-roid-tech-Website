import type React from "react"
import { Plus, Filter, Handshake, Users, Heart, DollarSign, Mail } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"

const partnersData = [
  {
    id: 1,
    name: "Green Earth Foundation",
    type: "NGO",
    contact: "contact@greenearth.org",
    partnership: "Environmental Projects",
    status: "Active",
  },
  {
    id: 2,
    name: "TechCorp Solutions",
    type: "Business",
    contact: "partnerships@techcorp.com",
    partnership: "IT Infrastructure",
    status: "Active",
  },
  {
    id: 3,
    name: "City University",
    type: "Educational",
    contact: "outreach@cityuni.edu",
    partnership: "Research Collaboration",
    status: "Pending",
  },
]

export const PartnersSection: React.FC = () => {
  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Partners</h1>
          <p className={styles.sectionDescription}>Manage partnerships and collaborations</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}>
          <Plus size={16} />
          Add Partner
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Partners" value="34" change="+5 this quarter" icon={Handshake} />
        <StatCard title="Corporate Partners" value="18" change="Business partnerships" icon={Users} />
        <StatCard title="NGO Partners" value="12" change="Collaborative projects" icon={Heart} />
        <StatCard title="Partnership Value" value="$2.4M" change="Annual contribution" icon={DollarSign} />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Partnership Directory</h2>
          <div className={componentStyles.inputGroup}>
            <input className={componentStyles.input} placeholder="Search partners..." />
            <button
              className={`${componentStyles.button} ${componentStyles.buttonSecondary} ${componentStyles.buttonSmall}`}
            >
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>
        <div className={componentStyles.cardContent}>
          <table className={componentStyles.table}>
            <thead className={componentStyles.tableHeader}>
              <tr>
                <th className={componentStyles.tableHeaderCell}>Organization</th>
                <th className={componentStyles.tableHeaderCell}>Type</th>
                <th className={componentStyles.tableHeaderCell}>Contact</th>
                <th className={componentStyles.tableHeaderCell}>Partnership Focus</th>
                <th className={componentStyles.tableHeaderCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {partnersData.map((partner) => (
                <tr key={partner.id} className={componentStyles.tableRow}>
                  <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>{partner.name}</td>
                  <td className={componentStyles.tableCell}>
                    <span className={`${componentStyles.badge} ${componentStyles.badgeOutline}`}>{partner.type}</span>
                  </td>
                  <td className={componentStyles.tableCell}>
                    <div className={componentStyles.iconButton}>
                      <Mail size={12} />
                      {partner.contact}
                    </div>
                  </td>
                  <td className={componentStyles.tableCell}>{partner.partnership}</td>
                  <td className={componentStyles.tableCell}>
                    <span
                      className={`${componentStyles.badge} ${partner.status === "Active" ? componentStyles.badgeDefault : componentStyles.badgeSecondary}`}
                    >
                      {partner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
