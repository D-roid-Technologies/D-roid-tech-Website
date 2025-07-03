import type React from "react"
import { Plus, Filter, UserCheck, Users, Target, TrendingUp } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"

const groupsData = [
  { id: 1, name: "Board of Directors", members: 8, lead: "Dr. Jane Smith", focus: "Governance", status: "Active" },
  {
    id: 2,
    name: "Field Operations",
    members: 15,
    lead: "Mark Johnson",
    focus: "Program Implementation",
    status: "Active",
  },
  {
    id: 3,
    name: "Fundraising Committee",
    members: 6,
    lead: "Lisa Chen",
    focus: "Resource Mobilization",
    status: "Active",
  },
  { id: 4, name: "Youth Advisory", members: 12, lead: "Alex Rivera", focus: "Youth Engagement", status: "Active" },
]

export const GroupsSection: React.FC = () => {
  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Groups</h1>
          <p className={styles.sectionDescription}>Manage teams and working groups</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}>
          <Plus size={16} />
          Create Group
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Groups" value="12" change="Across all departments" icon={UserCheck} />
        <StatCard title="Total Members" value="89" change="Active participants" icon={Users} />
        <StatCard title="Avg. Group Size" value="7.4" change="Members per group" icon={Target} />
        <StatCard title="Engagement Rate" value="85%" change="Meeting attendance" icon={TrendingUp} />
      </div>

      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Groups Overview</h2>
          <div className={componentStyles.inputGroup}>
            <input className={componentStyles.input} placeholder="Search groups..." />
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
                <th className={componentStyles.tableHeaderCell}>Group Name</th>
                <th className={componentStyles.tableHeaderCell}>Members</th>
                <th className={componentStyles.tableHeaderCell}>Lead</th>
                <th className={componentStyles.tableHeaderCell}>Focus Area</th>
                <th className={componentStyles.tableHeaderCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {groupsData.map((group) => (
                <tr key={group.id} className={componentStyles.tableRow}>
                  <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>{group.name}</td>
                  <td className={componentStyles.tableCell}>
                    <div className={componentStyles.iconButton}>
                      <Users size={12} />
                      {group.members}
                    </div>
                  </td>
                  <td className={componentStyles.tableCell}>{group.lead}</td>
                  <td className={componentStyles.tableCell}>{group.focus}</td>
                  <td className={componentStyles.tableCell}>
                    <span className={`${componentStyles.badge} ${componentStyles.badgeDefault}`}>{group.status}</span>
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
