import type { Student } from "./student"

export const exportToExcel = (students: Student[], className: string) => {
  // Create CSV content
  const headers = [
    "Position",
    "Admission Number",
    "First Name",
    "Last Name",
    "Gender",
    "Age",
    "Class",
    "Term",
    "Session",
    "Total Score",
    "Average",
    "Percentage",
    "Grade",
    "Remarks",
  ]

  // Add subject headers dynamically
  const allSubjects = students.length > 0 ? students[0].subjects.map((s) => s.subject) : []
  const subjectHeaders = allSubjects.flatMap((subject) => [
    `${subject} - Test`,
    `${subject} - Mid-Term`,
    `${subject} - Exam`,
    `${subject} - Total`,
    `${subject} - Grade`,
  ])

  const allHeaders = [...headers, ...subjectHeaders]

  // Create rows
  const rows = students.map((student) => {
    const basicInfo = [
      student.position,
      student.admissionNumber,
      student.firstName,
      student.lastName,
      student.gender,
      student.age,
      student.classLevel,
      student.term,
      student.session,
      student.totalScore,
      student.average,
      student.percentage,
      student.grade,
      student.remarks,
    ]

    // Add subject scores
    const subjectScores = student.subjects.flatMap((subject) => [
      subject.test,
      subject.midTerm,
      subject.exam,
      subject.total,
      subject.grade,
    ])

    return [...basicInfo, ...subjectScores]
  })

  // Convert to CSV format
  const csvContent = [
    allHeaders.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Handle cells that might contain commas or quotes
          const cellStr = String(cell)
          if (cellStr.includes(",") || cellStr.includes('"') || cellStr.includes("\n")) {
            return `"${cellStr.replace(/"/g, '""')}"`
          }
          return cellStr
        })
        .join(","),
    ),
  ].join("\n")

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${className}_Students_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const exportToExcelAdvanced = async (students: Student[], className: string) => {
  try {
    // Dynamic import to avoid bundling issues
    // @ts-ignore
    const XLSX = await import("xlsx")

    // Prepare data for Excel
    const worksheetData = students.map((student) => {
      const basicData = {
        Position: student.position,
        "Admission Number": student.admissionNumber,
        "First Name": student.firstName,
        "Last Name": student.lastName,
        "Full Name": student.fullName,
        Gender: student.gender,
        Age: student.age,
        Class: student.classLevel,
        Term: student.term,
        Session: student.session,
        "Total Score": student.totalScore,
        Average: student.average,
        Percentage: student.percentage,
        Grade: student.grade,
        Remarks: student.remarks,
      }

      // Add subject data
      const subjectData: Record<string, any> = {}
      student.subjects.forEach((subject) => {
        subjectData[`${subject.subject} - Test`] = subject.test
        subjectData[`${subject.subject} - Mid-Term`] = subject.midTerm
        subjectData[`${subject.subject} - Exam`] = subject.exam
        subjectData[`${subject.subject} - Total`] = subject.total
        subjectData[`${subject.subject} - Grade`] = subject.grade
        subjectData[`${subject.subject} - Remarks`] = subject.remarks
      })

      return { ...basicData, ...subjectData }
    })

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(worksheetData)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students")

    // Generate Excel file and download
    const fileName = `${className}_Students_${new Date().toISOString().split("T")[0]}.xlsx`
    XLSX.writeFile(workbook, fileName)
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    // Fallback to CSV export
    exportToExcel(students, className)
  }
}
