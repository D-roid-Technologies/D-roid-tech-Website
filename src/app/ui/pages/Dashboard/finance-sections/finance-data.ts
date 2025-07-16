// lib/finance-data.ts

export interface Contribution {
  id: string
  [key: string]: any // Allows for flexible keys like 'name', 'source', 'expense', 'employee', 'project'
}

export interface FinanceSectionData {
  id: string
  title: string
  description: string
  currentValue: string
  statusBadge?: { text: string; type: "destructive" | "default" | "success" }
  icon?: string // Used to map to LucideReact icons
  additionalInfo?: string
  contributions: Contribution[]
  progress?: { value: number; target: string; raised: string }
}

export const financeSectionsData: FinanceSectionData[] = [
  {
    id: "incoming",
    title: "Incoming",
    description: "Detailed list of all money received, categorized by source.",
    currentValue: "$5,678.90",
    icon: "ArrowUpRight",
    additionalInfo: "Last 30 days",
    contributions: [
      { id: "i1", source: "Client A Payment", amount: 1200.0, date: "2023-07-01" },
      { id: "i2", source: "Product Sales (Online)", amount: 850.5, date: "2023-07-03" },
      { id: "i3", source: "Service Fee (Project X)", amount: 3000.0, date: "2023-07-08" },
      { id: "i4", source: "Refund from Vendor", amount: 150.0, date: "2023-07-11" },
      { id: "i5", source: "Consulting Income", amount: 500.0, date: "2023-07-14" },
    ],
  },
  {
    id: "outgoing",
    title: "Outgoing",
    description: "Detailed list of all money spent, categorized by expense type.",
    currentValue: "$3,456.78",
    icon: "ArrowDownLeft",
    additionalInfo: "Last 30 days",
    contributions: [
      { id: "o1", expense: "Office Supplies", amount: 75.0, date: "2023-07-02" },
      { id: "o2", expense: "Marketing Campaign", amount: 1500.0, date: "2023-07-04" },
      { id: "o3", expense: "Utility Bill (Electricity)", amount: 250.0, date: "2023-07-07" },
      { id: "o4", expense: "Software License Renewal", amount: 500.0, date: "2023-07-09" },
      { id: "o5", expense: "Travel Expenses", amount: 1000.0, date: "2023-07-13" },
    ],
  },
  {
    id: "fees",
    title: "Fees",
    description: "Detailed breakdown of all incurred fees and their sources.",
    currentValue: "$1,234.56",
    statusBadge: { text: "Overdue", type: "destructive" },
    additionalInfo: "Last updated: 2 hours ago",
    contributions: [
      { id: "f1", name: "Bank Transaction Fee", amount: 15.0, date: "2023-07-01" },
      { id: "f2", name: "Software Subscription", amount: 99.99, date: "2023-07-05" },
      { id: "f3", name: "Consulting Service Fee", amount: 250.0, date: "2023-07-10" },
      { id: "f4", name: "Payment Gateway Fee", amount: 12.5, date: "2023-07-12" },
      { id: "f5", name: "Legal Advisory Fee", amount: 500.0, date: "2023-07-15" },
    ],
  },
  {
    id: "funding",
    title: "Funding",
    description: "Detailed information on current funding sources and progress towards targets.",
    currentValue: "$75,000",
    progress: { value: 75, target: "$100,000", raised: "$75,000" },
    additionalInfo: "75% of target achieved",
    contributions: [
      { id: "fu1", name: "Grant from Foundation X", amount: 50000.0, date: "2023-06-20" },
      { id: "fu2", name: "Angel Investor Round", amount: 20000.0, date: "2023-07-01" },
      { id: "fu3", name: "Crowdfunding Campaign", amount: 5000.0, date: "2023-07-10" },
      { id: "fu4", name: "Government Subsidy", amount: 10000.0, date: "2023-07-15" },
    ],
  },
  {
    id: "salaries",
    title: "Salaries",
    description: "Detailed breakdown of all salary expenses and upcoming payrolls.",
    currentValue: "$12,345.00",
    icon: "Users",
    additionalInfo: "Next payroll: 5 days",
    contributions: [
      { id: "s1", employee: "John Doe", amount: 4500.0, date: "2023-07-15", status: "Paid" },
      { id: "s2", employee: "Jane Smith", amount: 3800.0, date: "2023-07-15", status: "Paid" },
      { id: "s3", employee: "Peter Jones", amount: 4000.0, date: "2023-07-15", status: "Paid" },
      { id: "s4", employee: "Alice Brown", amount: 3500.0, date: "2023-07-15", status: "Paid" },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    description: "Financial breakdown and status for each active project.",
    currentValue: "Multiple", // This card has a list, not a single value
    icon: "Tag",
    additionalInfo: "Active projects",
    contributions: [
      { id: "p1", project: "Project Alpha", budget: 20000, spent: 15000, status: "On Track" },
      { id: "p2", project: "Project Beta", budget: 10000, spent: 8500, status: "Near Budget" },
      { id: "p3", project: "Project Gamma", budget: 25000, spent: 22100, status: "Over Budget" },
      { id: "p4", project: "Project Delta", budget: 5000, spent: 3000, status: "On Track" },
    ],
  },
]
