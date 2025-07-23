// data/schoolData.ts

export interface Student {
  name: string;
  subject: string;
  className: string;
  test: number;
  midTerm: number;
  exam: number;
}

export interface ClassGroup {
  level: string;
  classes: string[];
  subjects: string[];
}

export const classGroups: ClassGroup[] = [
  {
    level: "Creche",
    classes: ["Creche 1", "Creche 2", "Creche 3"],
    subjects: ["Rhymes", "Drawing", "Number Work"],
  },
  {
    level: "Nursery",
    classes: ["Nursery 1", "Nursery 2", "Nursery 3"],
    subjects: ["Phonics", "Storytelling", "Basic Science"],
  },
  {
    level: "Primary",
    classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    subjects: ["Mathematics", "English", "Basic Science", "Civic Education"],
  },
  {
    level: "Secondary",
    classes: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"],
    subjects: ["Mathematics", "English", "Biology", "Government", "Literature"],
  },
];

export const sampleStudents: Student[] = [
  {
    name: "Emeka Okoro",
    subject: "Mathematics",
    className: "JSS 2",
    test: 8,
    midTerm: 15,
    exam: 55,
  },
  {
    name: "Ada Nwachukwu",
    subject: "English",
    className: "Nursery 2",
    test: 9,
    midTerm: 18,
    exam: 62,
  },
  {
    name: "Ibrahim Bello",
    subject: "Basic Science",
    className: "Primary 3",
    test: 7,
    midTerm: 14,
    exam: 49,
  },
];
