export interface Student {
  id: string
  admissionNumber: string
  firstName: string
  lastName: string
  fullName: string
  gender: "Male" | "Female"
  age: number
  classLevel: string
  term: string
  session: string
  subjects: SubjectScore[]
  totalScore: number
  percentage: number
  average: number
  position: number
  grade: string
  remarks: string
}

export interface SubjectScore {
  subject: string
  test: number // out of 10
  midTerm: number // out of 20
  exam: number // out of 70
  total: number // out of 100
  grade: string
  remarks: string
}

export interface ClassLevel {
  level: string
  classes: string[]
  subjects: string[]
  maxScores: {
    test: number
    midTerm: number
    exam: number
  }
}
