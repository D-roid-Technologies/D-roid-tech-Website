import type React from "react"
import { Download, Heart, Award, MapPin, TrendingUp } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import { ProgressBar } from "./micro-ui/progress-bar"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"

export const ImpactSection: React.FC = () => {
  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Impact</h1>
          <p className={styles.sectionDescription}>Track and measure your organization's impact</p>
        </div>
        <button className={`${componentStyles.button} ${componentStyles.buttonPrimary}`}>
          <Download size={16} />
          Generate Report
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Lives Impacted" value="12,847" change="+23% from last year" icon={Heart} />
        <StatCard title="Projects Completed" value="47" change="This year" icon={Award} />
        <StatCard title="Communities Served" value="28" change="Across 5 regions" icon={MapPin} />
        <StatCard title="Efficiency Score" value="94%" change="Resource utilization" icon={TrendingUp} />
      </div>

      <div className={styles.contentGrid}>
        <div className={componentStyles.card}>
          <div className={componentStyles.cardHeader}>
            <h2 className={componentStyles.cardTitle}>Program Impact Goals</h2>
            <p className={componentStyles.cardDescription}>Progress towards annual targets</p>
          </div>
          <div className={componentStyles.cardContent}>
            <ProgressBar value={75} label="Education Programs" />
            <ProgressBar value={82} label="Healthcare Initiatives" />
            <ProgressBar value={68} label="Environmental Projects" />
            <ProgressBar value={91} label="Community Development" />
          </div>
        </div>

        <div className={componentStyles.card}>
          <div className={componentStyles.cardHeader}>
            <h2 className={componentStyles.cardTitle}>Impact Metrics</h2>
            <p className={componentStyles.cardDescription}>Key performance indicators</p>
          </div>
          <div className={componentStyles.cardContent}>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Clean Water Access</h3>
                <p>People with improved access</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>4,521</h2>
                <p>+15% this quarter</p>
              </div>
            </div>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Educational Support</h3>
                <p>Students supported</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>1,847</h2>
                <p>+28% this quarter</p>
              </div>
            </div>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Healthcare Services</h3>
                <p>Medical consultations</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>2,156</h2>
                <p>+12% this quarter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
