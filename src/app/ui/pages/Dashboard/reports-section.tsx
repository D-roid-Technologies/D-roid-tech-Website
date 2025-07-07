"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react"
import { StatCard } from "./micro-ui/stat-card"
import { ProgressBar } from "./micro-ui/progress-bar"
import styles from "./dashboard.module.css"
import componentStyles from "./components.module.css"
import { toast } from "react-toastify"

interface ReportData {
  id: number
  name: string
  type: "Financial" | "Project" | "Client" | "Department" | "Performance"
  period: string
  generatedDate: string
  status: "Generated" | "Pending" | "Scheduled"
  size: string
}

const reportsData: ReportData[] = [
  {
    id: 1,
    name: "Q1 Financial Summary",
    type: "Financial",
    period: "Q1 2024",
    generatedDate: "2024-01-15",
    status: "Generated",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Project Performance Report",
    type: "Project",
    period: "December 2023",
    generatedDate: "2024-01-01",
    status: "Generated",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Client Satisfaction Survey",
    type: "Client",
    period: "Q4 2023",
    generatedDate: "2023-12-28",
    status: "Generated",
    size: "956 KB",
  },
  {
    id: 4,
    name: "Department Budget Analysis",
    type: "Department",
    period: "Annual 2023",
    generatedDate: "2024-01-10",
    status: "Pending",
    size: "—",
  },
]

const reportTypeOptions = [
  { label: "Financial", value: "Financial" },
  { label: "Project", value: "Project" },
  { label: "Client", value: "Client" },
  { label: "Department", value: "Department" },
  { label: "Performance", value: "Performance" },
]

const periodOptions = [
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "Last quarter", value: "quarter" },
  { label: "Last year", value: "year" },
  { label: "Custom range", value: "custom" },
]

export const ReportsSection: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("30days")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock analytics data
  const analyticsData = useMemo(() => {
    return {
      revenue: {
        current: 2450000,
        previous: 2180000,
        growth: 12.4,
      },
      projects: {
        completed: 23,
        inProgress: 15,
        onHold: 3,
        cancelled: 2,
      },
      clients: {
        active: 45,
        new: 8,
        retention: 94.2,
      },
      departments: {
        engineering: { budget: 2500000, spent: 1875000, utilization: 75 },
        marketing: { budget: 800000, spent: 640000, utilization: 80 },
        hr: { budget: 600000, spent: 420000, utilization: 70 },
        finance: { budget: 1200000, spent: 960000, utilization: 80 },
      },
    }
  }, [])

  const handleGenerateReport = () => {
    if (!selectedReportType) {
      toast.error("Please select a report type to generate.")
      return
    }

    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      toast.success(`${selectedReportType} report has been generated successfully.`)
    }, 3000)
  }

  const handleDownloadReport = (reportName: string) => {
    toast.info(`Downloading ${reportName}...`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Generated":
        return componentStyles.badgeSuccess
      case "Pending":
        return componentStyles.badgeWarning
      case "Scheduled":
        return componentStyles.badgeDefault
      default:
        return componentStyles.badgeSecondary
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Financial":
        return <BarChart3 size={16} />
      case "Project":
        return <TrendingUp size={16} />
      case "Client":
        return <PieChart size={16} />
      default:
        return <FileText size={16} />
    }
  }

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Reports & Analytics</h1>
          <p className={styles.sectionDescription}>Generate and view business reports and performance analytics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Revenue Growth"
          value={`${analyticsData.revenue.growth}%`}
          change="vs previous period"
          icon={TrendingUp}
        />
        <StatCard
          title="Active Projects"
          value={analyticsData.projects.inProgress.toString()}
          change={`${analyticsData.projects.completed} completed`}
          icon={BarChart3}
        />
        <StatCard
          title="Client Retention"
          value={`${analyticsData.clients.retention}%`}
          change={`${analyticsData.clients.new} new clients`}
          icon={PieChart}
        />
        <StatCard
          title="Reports Generated"
          value={reportsData.filter((r) => r.status === "Generated").length.toString()}
          change="This month"
          icon={FileText}
        />
      </div>

      <div className={styles.contentGrid}>
        {/* Report Generator */}
        <div className={componentStyles.card}>
          <div className={componentStyles.cardHeader}>
            <h2 className={componentStyles.cardTitle}>Generate New Report</h2>
            <p className={componentStyles.cardDescription}>Create custom reports based on your requirements</p>
          </div>
          <div className={componentStyles.cardContent}>
            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Report Type</label>
              <select
                className={componentStyles.select}
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
              >
                <option value="">Select report type</option>
                {reportTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={componentStyles.formGroup}>
              <label className={componentStyles.label}>Time Period</label>
              <select
                className={componentStyles.select}
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                {periodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedPeriod === "custom" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className={componentStyles.formGroup}>
                  <label className={componentStyles.label}>Start Date</label>
                  <input
                    type="date"
                    className={componentStyles.input}
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                </div>
                <div className={componentStyles.formGroup}>
                  <label className={componentStyles.label}>End Date</label>
                  <input
                    type="date"
                    className={componentStyles.input}
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              className={`${componentStyles.button} ${componentStyles.buttonPrimary} ${isGenerating ? componentStyles.buttonDisabled : ""}`}
              onClick={handleGenerateReport}
              disabled={isGenerating}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </div>

        {/* Department Budget Overview */}
        <div className={componentStyles.card}>
          <div className={componentStyles.cardHeader}>
            <h2 className={componentStyles.cardTitle}>Department Budget Utilization</h2>
            <p className={componentStyles.cardDescription}>Current budget usage across departments</p>
          </div>
          <div className={componentStyles.cardContent}>
            {Object.entries(analyticsData.departments).map(([dept, data]) => (
              <ProgressBar
                key={dept}
                value={data.utilization}
                label={`${dept.charAt(0).toUpperCase() + dept.slice(1)} (${data.utilization}%)`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className={componentStyles.card}>
        <div className={componentStyles.cardHeader}>
          <h2 className={componentStyles.cardTitle}>Recent Reports</h2>
          <div className={componentStyles.inputGroup}>
            <select className={componentStyles.select} style={{ minWidth: "150px" }}>
              <option value="">All Types</option>
              {reportTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={componentStyles.cardContent}>
          <table className={componentStyles.table}>
            <thead className={componentStyles.tableHeader}>
              <tr>
                <th className={componentStyles.tableHeaderCell}>Report</th>
                <th className={componentStyles.tableHeaderCell}>Type</th>
                <th className={componentStyles.tableHeaderCell}>Period</th>
                <th className={componentStyles.tableHeaderCell}>Generated</th>
                <th className={componentStyles.tableHeaderCell}>Status</th>
                <th className={componentStyles.tableHeaderCell}>Size</th>
                <th className={componentStyles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.map((report) => (
                <tr key={report.id} className={componentStyles.tableRow}>
                  <td className={`${componentStyles.tableCell} ${componentStyles.tableCellBold}`}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {getTypeIcon(report.type)}
                      {report.name}
                    </div>
                  </td>
                  <td className={componentStyles.tableCell}>
                    <span className={`${componentStyles.badge} ${componentStyles.badgeOutline}`}>{report.type}</span>
                  </td>
                  <td className={componentStyles.tableCell}>{report.period}</td>
                  <td className={componentStyles.tableCell}>{report.generatedDate}</td>
                  <td className={componentStyles.tableCell}>
                    <span className={`${componentStyles.badge} ${getStatusColor(report.status)}`}>{report.status}</span>
                  </td>
                  <td className={componentStyles.tableCell}>{report.size}</td>
                  <td className={componentStyles.tableCell}>
                    {report.status === "Generated" && (
                      <button
                        className={componentStyles.actionButton}
                        onClick={() => handleDownloadReport(report.name)}
                        title="Download report"
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className={styles.contentGrid}>
        <div className={componentStyles.card}>
          <div className={componentStyles.cardHeader}>
            <h2 className={componentStyles.cardTitle}>Revenue Analytics</h2>
            <p className={componentStyles.cardDescription}>Financial performance overview</p>
          </div>
          <div className={componentStyles.cardContent}>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Current Period Revenue</h3>
                <p>Total revenue generated</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>${(analyticsData.revenue.current / 1000000).toFixed(1)}M</h2>
                <p>+{analyticsData.revenue.growth}% growth</p>
              </div>
            </div>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Previous Period</h3>
                <p>Comparison baseline</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>${(analyticsData.revenue.previous / 1000000).toFixed(1)}M</h2>
                <p>Previous period</p>
              </div>
            </div>
          </div>
        </div>

        <div className={componentStyles.card}>
          <div className={componentStyles.cardHeader}>
            <h2 className={componentStyles.cardTitle}>Project Status Overview</h2>
            <p className={componentStyles.cardDescription}>Current project distribution</p>
          </div>
          <div className={componentStyles.cardContent}>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Completed Projects</h3>
                <p>Successfully delivered</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>{analyticsData.projects.completed}</h2>
                <p>This period</p>
              </div>
            </div>
            <div className={componentStyles.metricCard}>
              <div className={componentStyles.metricInfo}>
                <h3>Active Projects</h3>
                <p>Currently in progress</p>
              </div>
              <div className={componentStyles.metricValue}>
                <h2>{analyticsData.projects.inProgress}</h2>
                <p>In development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
