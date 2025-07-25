import type { Student, ClassLevel, SubjectScore } from "./student"

export const classLevels: ClassLevel[] = [
  {
    level: "Creche",
    classes: ["Creche 1", "Creche 2", "Creche 3"],
    subjects: ["Rhymes", "Drawing", "Number Work", "Play Activities"],
    maxScores: { test: 10, midTerm: 20, exam: 70 },
  },
  {
    level: "Nursery",
    classes: ["Nursery 1", "Nursery 2", "Nursery 3"],
    subjects: ["Phonics", "Numbers", "Storytelling", "Basic Science", "Creative Arts"],
    maxScores: { test: 10, midTerm: 20, exam: 70 },
  },
  {
    level: "Primary",
    classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    subjects: [
      "English Language",
      "Mathematics",
      "Basic Science",
      "Social Studies",
      "Civic Education",
      "Creative Arts",
    ],
    maxScores: { test: 10, midTerm: 20, exam: 70 },
  },
  {
    level: "Secondary",
    classes: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"],
    subjects: [
      "English Language",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Government",
      "Literature",
      "Geography",
      "Economics",
    ],
    maxScores: { test: 10, midTerm: 20, exam: 70 },
  },
]

const calculateGrade = (total: number): string => {
  if (total >= 80) return "A"
  if (total >= 70) return "B"
  if (total >= 60) return "C"
  if (total >= 50) return "D"
  if (total >= 40) return "E"
  return "F"
}

const getRemarks = (grade: string): string => {
  switch (grade) {
    case "A":
      return "Excellent"
    case "B":
      return "Very Good"
    case "C":
      return "Good"
    case "D":
      return "Satisfactory"
    case "E":
      return "Needs Improvement"
    default:
      return "Fail"
  }
}

const generateSubjectScores = (subjects: string[]): SubjectScore[] => {
  return subjects.map((subject) => {
    const test = Math.floor(Math.random() * 11) // 0-10
    const midTerm = Math.floor(Math.random() * 21) // 0-20
    const exam = Math.floor(Math.random() * 71) // 0-70
    const total = test + midTerm + exam
    const grade = calculateGrade(total)

    return {
      subject,
      test,
      midTerm,
      exam,
      total,
      grade,
      remarks: getRemarks(grade),
    }
  })
}

const generateStudentData = (): Student[] => {
  const students: Student[] = []
  let idCounter = 1

  const firstNames = [
    "Adebayo",
    "Chioma",
    "Emeka",
    "Fatima",
    "Ibrahim",
    "Kemi",
    "Olumide",
    "Aisha",
    "Chukwuma",
    "Ngozi",
    "Yusuf",
    "Blessing",
    "Tunde",
    "Amina",
    "Ikechukwu",
    "Zainab",
    "Babatunde",
    "Folake",
    "Musa",
    "Grace",
    "Segun",
    "Hauwa",
    "Chinedu",
    "Rukayya",
    "Adamu",
    "Funmi",
    "Usman",
    "Joy",
    "Bello",
    "Comfort",
  ]

  const lastNames = [
    "Adebayo",
    "Okafor",
    "Bello",
    "Yakubu",
    "Ogundimu",
    "Aliyu",
    "Nwachukwu",
    "Garba",
    "Oluwaseun",
    "Abdullahi",
    "Chukwu",
    "Sani",
    "Adeyemi",
    "Musa",
    "Okoro",
    "Umar",
    "Adeola",
    "Yusuf",
    "Eze",
    "Lawal",
    "Ogbonna",
    "Danjuma",
    "Adebisi",
    "Shehu",
    "Nwosu",
    "Abubakar",
    "Adeleke",
    "Tijani",
    "Okonkwo",
    "Salisu",
  ]

  classLevels.forEach((level) => {
    level.classes.forEach((className) => {
      // Generate 15-25 students per class
      const numStudents = Math.floor(Math.random() * 11) + 15

      for (let i = 0; i < numStudents; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const gender = Math.random() > 0.5 ? "Male" : "Female"
        const age = getAgeForClass(className)

        const subjects = generateSubjectScores(level.subjects)
        const totalScore = subjects.reduce((sum, subject) => sum + subject.total, 0)
        const average = totalScore / subjects.length
        const percentage = (totalScore / (subjects.length * 100)) * 100

        students.push({
          id: `STU${String(idCounter).padStart(4, "0")}`,
          admissionNumber: `${level.level.toUpperCase()}/${new Date().getFullYear()}/${String(idCounter).padStart(3, "0")}`,
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
          gender,
          age,
          classLevel: className,
          term: "First Term",
          session: "2023/2024",
          subjects,
          totalScore,
          percentage: Math.round(percentage * 100) / 100,
          average: Math.round(average * 100) / 100,
          position: 0, // Will be calculated after all students are generated
          grade: calculateGrade(average),
          remarks: getRemarks(calculateGrade(average)),
        })

        idCounter++
      }
    })
  })

  // Calculate positions within each class
  const classesList = [...new Set(students.map((s) => s.classLevel))]
  classesList.forEach((className) => {
    const classStudents = students.filter((s) => s.classLevel === className)
    classStudents.sort((a, b) => b.average - a.average)
    classStudents.forEach((student, index) => {
      student.position = index + 1
    })
  })

  return students
}

const getAgeForClass = (className: string): number => {
  if (className.includes("Creche")) return Math.floor(Math.random() * 2) + 2 // 2-3
  if (className.includes("Nursery")) return Math.floor(Math.random() * 2) + 4 // 4-5
  if (className.includes("Primary")) {
    const grade = Number.parseInt(className.split(" ")[1])
    return grade + 5 // Primary 1 = 6 years old, etc.
  }
  if (className.includes("JSS")) {
    const grade = Number.parseInt(className.split(" ")[1])
    return grade + 11 // JSS 1 = 12 years old, etc.
  }
  if (className.includes("SS")) {
    const grade = Number.parseInt(className.split(" ")[1])
    return grade + 14 // SS 1 = 15 years old, etc.
  }
  return 10
}

export const studentsData: Student[] = generateStudentData()
console.log("studentsData",studentsData)

export const getStudentsByClass = (className: string): Student[] => {
  return studentsData.filter((student) => student.classLevel === className)
}

export const getStudentById = (id: string): Student | undefined => {
  return studentsData.find((student) => student.id === id)
}

export const getClassesByLevel = (level: string): string[] => {
  const classLevel = classLevels.find((cl) => cl.level === level)
  return classLevel ? classLevel.classes : []
}

export const getSubjectsByClass = (className: string): string[] => {
  for (const level of classLevels) {
    if (level.classes.includes(className)) {
      return level.subjects
    }
  }
  return []
}
