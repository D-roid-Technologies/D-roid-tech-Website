// components/school-fees/school-fees-data.ts

export interface FeeItem {
  name: string
  amount: number
}

export interface ClassLevel {
  id: string
  name: string
  fees: FeeItem[]
}

export interface SchoolCategory {
  id: string
  name: string
  classLevels: ClassLevel[]
}

export const schoolFeesData: SchoolCategory[] = [
  {
    id: "nursery",
    name: "Nursery School",
    classLevels: [
      {
      id: "creche-1",
      name: "Crèche 1",
      fees: [
        { name: "Tuition Fee", amount: 120000 },
        { name: "Books & Materials", amount: 20000 },
        { name: "Uniforms (2 sets)", amount: 15000 },
        { name: "PTA Levy", amount: 4000 },
        { name: "Feeding Fee", amount: 15000 },
      ],
    },
    {
      id: "creche-2",
      name: "Crèche 2",
      fees: [
        { name: "Tuition Fee", amount: 130000 },
        { name: "Books & Materials", amount: 22000 },
        { name: "Uniforms (2 sets)", amount: 15000 },
        { name: "PTA Levy", amount: 4000 },
        { name: "Feeding Fee", amount: 15000 },
      ],
    },
    {
      id: "playgroup",
      name: "Playgroup",
      fees: [
        { name: "Tuition Fee", amount: 140000 },
        { name: "Books & Materials", amount: 24000 },
        { name: "Uniforms (2 sets)", amount: 15000 },
        { name: "PTA Levy", amount: 4000 },
        { name: "Feeding Fee", amount: 15000 },
      ],
    },
      {
        id: "nursery-1",
        name: "Nursery 1",
        fees: [
          { name: "Tuition Fee", amount: 150000 },
          { name: "Books & Materials", amount: 25000 },
          { name: "Uniforms (2 sets)", amount: 18000 },
          { name: "PTA Levy", amount: 5000 },
          { name: "Excursion Fee", amount: 10000 },
        ],
      },
      {
        id: "nursery-2",
        name: "Nursery 2",
        fees: [
          { name: "Tuition Fee", amount: 160000 },
          { name: "Books & Materials", amount: 27000 },
          { name: "Uniforms (2 sets)", amount: 18000 },
          { name: "PTA Levy", amount: 5000 },
          { name: "Excursion Fee", amount: 10000 },
        ],
      },
      {
        id: "nursery-3",
        name: "Nursery 3",
        fees: [
          { name: "Tuition Fee", amount: 170000 },
          { name: "Books & Materials", amount: 29000 },
          { name: "Uniforms (2 sets)", amount: 18000 },
          { name: "PTA Levy", amount: 5000 },
          { name: "Excursion Fee", amount: 10000 },
        ],
      },
    ],
  },
  {
    id: "primary",
    name: "Primary School",
    classLevels: [
      {
        id: "primary-1",
        name: "Primary 1",
        fees: [
          { name: "Tuition Fee", amount: 200000 },
          { name: "Books & Materials", amount: 35000 },
          { name: "Uniforms (2 sets)", amount: 20000 },
          { name: "PTA Levy", amount: 6000 },
          { name: "Sport Fee", amount: 8000 },
          { name: "Computer Lab Fee", amount: 12000 },
        ],
      },
      {
        id: "primary-2",
        name: "Primary 2",
        fees: [
          { name: "Tuition Fee", amount: 210000 },
          { name: "Books & Materials", amount: 36000 },
          { name: "Uniforms (2 sets)", amount: 20000 },
          { name: "PTA Levy", amount: 6000 },
          { name: "Sport Fee", amount: 8000 },
          { name: "Computer Lab Fee", amount: 12000 },
        ],
      },
      {
        id: "primary-3",
        name: "Primary 3",
        fees: [
          { name: "Tuition Fee", amount: 220000 },
          { name: "Books & Materials", amount: 37000 },
          { name: "Uniforms (2 sets)", amount: 20000 },
          { name: "PTA Levy", amount: 6000 },
          { name: "Sport Fee", amount: 8000 },
          { name: "Computer Lab Fee", amount: 12000 },
        ],
      },
      {
        id: "primary-4",
        name: "Primary 4",
        fees: [
          { name: "Tuition Fee", amount: 230000 },
          { name: "Books & Materials", amount: 38000 },
          { name: "Uniforms (2 sets)", amount: 20000 },
          { name: "PTA Levy", amount: 6000 },
          { name: "Sport Fee", amount: 8000 },
          { name: "Computer Lab Fee", amount: 12000 },
        ],
      },
      {
        id: "primary-5",
        name: "Primary 5",
        fees: [
          { name: "Tuition Fee", amount: 240000 },
          { name: "Books & Materials", amount: 39000 },
          { name: "Uniforms (2 sets)", amount: 20000 },
          { name: "PTA Levy", amount: 6000 },
          { name: "Sport Fee", amount: 8000 },
          { name: "Computer Lab Fee", amount: 12000 },
        ],
      },
      {
        id: "primary-6",
        name: "Primary 6",
        fees: [
          { name: "Tuition Fee", amount: 250000 },
          { name: "Books & Materials", amount: 40000 },
          { name: "Uniforms (2 sets)", amount: 20000 },
          { name: "PTA Levy", amount: 6000 },
          { name: "Sport Fee", amount: 8000 },
          { name: "Computer Lab Fee", amount: 12000 },
          { name: "Graduation Fee", amount: 15000 },
        ],
      },
    ],
  },
  {
    id: "secondary",
    name: "Secondary School",
    classLevels: [
      {
        id: "jss1",
        name: "JSS1",
        fees: [
          { name: "Tuition Fee", amount: 300000 },
          { name: "Books & Materials", amount: 50000 },
          { name: "Uniforms (2 sets)", amount: 25000 },
          { name: "PTA Levy", amount: 7000 },
          { name: "Laboratory Fee", amount: 15000 },
          { name: "Excursion Fee", amount: 15000 },
          { name: "Sport Fee", amount: 10000 },
        ],
      },
      {
        id: "jss2",
        name: "JSS2",
        fees: [
          { name: "Tuition Fee", amount: 310000 },
          { name: "Books & Materials", amount: 52000 },
          { name: "Uniforms (2 sets)", amount: 25000 },
          { name: "PTA Levy", amount: 7000 },
          { name: "Laboratory Fee", amount: 15000 },
          { name: "Excursion Fee", amount: 15000 },
          { name: "Sport Fee", amount: 10000 },
        ],
      },
      {
        id: "jss3",
        name: "JSS3",
        fees: [
          { name: "Tuition Fee", amount: 320000 },
          { name: "Books & Materials", amount: 54000 },
          { name: "Uniforms (2 sets)", amount: 25000 },
          { name: "PTA Levy", amount: 7000 },
          { name: "Laboratory Fee", amount: 15000 },
          { name: "Excursion Fee", amount: 15000 },
          { name: "Sport Fee", amount: 10000 },
          { name: "Exam Registration Fee", amount: 20000 },
        ],
      },
      {
        id: "ss1",
        name: "SS1",
        fees: [
          { name: "Tuition Fee", amount: 350000 },
          { name: "Books & Materials", amount: 60000 },
          { name: "Uniforms (2 sets)", amount: 28000 },
          { name: "PTA Levy", amount: 8000 },
          { name: "Laboratory Fee", amount: 20000 },
          { name: "Excursion Fee", amount: 18000 },
          { name: "Sport Fee", amount: 12000 },
        ],
      },
      {
        id: "ss2",
        name: "SS2",
        fees: [
          { name: "Tuition Fee", amount: 360000 },
          { name: "Books & Materials", amount: 62000 },
          { name: "Uniforms (2 sets)", amount: 28000 },
          { name: "PTA Levy", amount: 8000 },
          { name: "Laboratory Fee", amount: 20000 },
          { name: "Excursion Fee", amount: 18000 },
          { name: "Sport Fee", amount: 12000 },
        ],
      },
      {
        id: "ss3",
        name: "SS3",
        fees: [
          { name: "Tuition Fee", amount: 370000 },
          { name: "Books & Materials", amount: 64000 },
          { name: "Uniforms (2 sets)", amount: 28000 },
          { name: "PTA Levy", amount: 8000 },
          { name: "Laboratory Fee", amount: 20000 },
          { name: "Excursion Fee", amount: 18000 },
          { name: "Sport Fee", amount: 12000 },
          { name: "WAEC/NECO Exam Fee", amount: 40000 },
          { name: "Graduation Fee", amount: 25000 },
        ],
      },
    ],
  },
]
