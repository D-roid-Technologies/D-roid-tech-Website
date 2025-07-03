import type React from "react"
import { Plus, Calendar, Megaphone, Users, TrendingUp, MapPin } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"

const outreachData = [
  {
    id: 1,
    program: "Community Health Workshop",
    location: "Downtown Center",
    date: "2024-02-15",
    participants: 45,
    status: "Scheduled",
  },
  {
    id: 2,
    program: "Youth Mentorship",
    location: "Local Schools",
    date: "2024-01-20",
    participants: 120,
    status: "Ongoing",
  },
  {
    id: 3,
    program: "Environmental Cleanup",
    location: "City Park",
    date: "2024-01-10",
    participants: 80,
    status: "Completed",
  },
]

export const OutreachSection: React.FC = () => {
  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Outreach</h1>
          <p className={styles.sectionDescription}>Manage community outreach programs and events</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}>
          <Plus size={16} />
          New Program
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Programs" value="8" change="2 starting this week" icon={Megaphone} />
        <StatCard title="People Reached" value="3,245" change="This quarter" icon={Users} />
        <StatCard title="Success Rate" value="92%" change="Program completion" icon={TrendingUp} />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Outreach Programs</h2>
          <div className={componentStyles.inputGroup}>
            <input className={componentStyles.input} placeholder="Search programs..." />
            <button
              className={`${componentStyles.button} ${componentStyles.buttonSecondary} ${componentStyles.buttonSmall}`}
            >
              <Calendar size={14} />
              Schedule
            </button>
          </div>
        </div>
        <div className={componentStyles.cardContent}>
          <table className={componentStyles.table}>
            <thead className={componentStyles.tableHeader}>
              <tr>
                <th className={componentStyles.tableHeaderCell}>Program</th>
                <th className={componentStyles.tableHeaderCell}>Location</th>
                <th className={componentStyles.tableHeaderCell}>Date</th>
                <th className={componentStyles.tableHeaderCell}>Participants</th>
                <th className={componentStyles.tableHeaderCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {outreachData.map((program) => (
                <tr key={program.id} className={componentStyles.tableRow}>
                  <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>{program.program}</td>
                  <td className={componentStyles.tableCell}>
                    <div className={componentStyles.iconButton}>
                      <MapPin size={12} />
                      {program.location}
                    </div>
                  </td>
                  <td className={componentStyles.tableCell}>{program.date}</td>
                  <td className={componentStyles.tableCell}>{program.participants}</td>
                  <td className={componentStyles.tableCell}>
                    <span
                      className={`${componentStyles.badge} ${
                        program.status === "Completed"
                          ? componentStyles.badgeDefault
                          : program.status === "Ongoing"
                            ? componentStyles.badgeSecondary
                            : componentStyles.badgeOutline
                      }`}
                    >
                      {program.status}
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
