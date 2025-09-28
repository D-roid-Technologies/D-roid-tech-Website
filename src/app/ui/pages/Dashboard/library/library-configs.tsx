import type { LibraryConfig, BaseLibraryItem } from "./generic-library-section"

// Configuration for General Library
export const generalLibraryConfig: LibraryConfig = {
  sectionTitle: "General Library",
  sectionDescription: "Manage books and resources across all subjects",
  itemName: "Book",
  itemNamePlural: "Books",
  addButtonText: "Add Book",
  modalTitle: {
    add: "Add New Book",
    edit: "Edit Book",
  },
  modalDescription: {
    add: "Add a new book to the general library collection",
    edit: "Update book information",
  },
  fields: [
    {
      key: "title",
      label: "Book Title",
      type: "text",
      placeholder: "Enter book title",
      required: true,
      validation: { required: true, minLength: 2, maxLength: 200 },
    },
    {
      key: "author",
      label: "Author",
      type: "text",
      placeholder: "Enter author name",
      required: true,
      validation: { required: true, minLength: 2, maxLength: 100 },
    },
    {
      key: "isbn",
      label: "ISBN",
      type: "text",
      placeholder: "978-0-123456-78-9",
      validation: { minLength: 10, maxLength: 17 },
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { label: "Fiction", value: "Fiction" },
        { label: "Non-Fiction", value: "Non-Fiction" },
        { label: "Science", value: "Science" },
        { label: "History", value: "History" },
        { label: "Biography", value: "Biography" },
        { label: "Reference", value: "Reference" },
      ],
      validation: { required: true },
    },
    {
      key: "location",
      label: "Shelf Location",
      type: "text",
      placeholder: "A-12-3",
      validation: { minLength: 2, maxLength: 20 },
    },
  ],
  statusOptions: [
    { label: "Available", value: "Available" },
    { label: "Checked Out", value: "Checked Out" },
    { label: "Reserved", value: "Reserved" },
    { label: "Maintenance", value: "Maintenance" },
  ],
  categoryOptions: [
    { label: "Fiction", value: "Fiction" },
    { label: "Non-Fiction", value: "Non-Fiction" },
    { label: "Science", value: "Science" },
    { label: "History", value: "History" },
    { label: "Biography", value: "Biography" },
    { label: "Reference", value: "Reference" },
  ],
}

// Configuration for Science Library
export const scienceLibraryConfig: LibraryConfig = {
  sectionTitle: "Science Library",
  sectionDescription: "Manage scientific journals, research papers, and laboratory resources",
  itemName: "Scientific Resource",
  itemNamePlural: "Scientific Resources",
  addButtonText: "Add Resource",
  modalTitle: {
    add: "Add New Scientific Resource",
    edit: "Edit Scientific Resource",
  },
  modalDescription: {
    add: "Add a new resource to the science library collection",
    edit: "Update scientific resource information",
  },
  fields: [
    {
      key: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter resource title",
      required: true,
      validation: { required: true, minLength: 2, maxLength: 200 },
    },
    {
      key: "author",
      label: "Author/Publisher",
      type: "text",
      placeholder: "Enter author or publisher",
      validation: { minLength: 2, maxLength: 100 },
    },
    {
      key: "category",
      label: "Subject Area",
      type: "select",
      required: true,
      options: [
        { label: "Physics", value: "Physics" },
        { label: "Chemistry", value: "Chemistry" },
        { label: "Biology", value: "Biology" },
        { label: "Mathematics", value: "Mathematics" },
        { label: "Engineering", value: "Engineering" },
        { label: "Environmental Science", value: "Environmental Science" },
      ],
      validation: { required: true },
    },
    {
      key: "location",
      label: "Location/Access",
      type: "text",
      placeholder: "Lab-A-12 or Online",
      validation: { minLength: 2, maxLength: 50 },
    },
  ],
  statusOptions: [
    { label: "Available", value: "Available" },
    { label: "Checked Out", value: "Checked Out" },
    { label: "Reserved", value: "Reserved" },
    { label: "Maintenance", value: "Maintenance" },
  ],
  categoryOptions: [
    { label: "Physics", value: "Physics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "Engineering", value: "Engineering" },
    { label: "Environmental Science", value: "Environmental Science" },
  ],
}

// Configuration for Digital Library
export const digitalLibraryConfig: LibraryConfig = {
  sectionTitle: "Digital Library",
  sectionDescription: "Manage electronic resources, e-books, and digital content",
  itemName: "Digital Resource",
  itemNamePlural: "Digital Resources",
  addButtonText: "Add Digital Resource",
  modalTitle: {
    add: "Add New Digital Resource",
    edit: "Edit Digital Resource",
  },
  modalDescription: {
    add: "Add a new digital resource to the collection",
    edit: "Update digital resource information",
  },
  fields: [
    {
      key: "title",
      label: "Resource Title",
      type: "text",
      placeholder: "Enter resource title",
      required: true,
      validation: { required: true, minLength: 2, maxLength: 200 },
    },
    {
      key: "author",
      label: "Creator/Publisher",
      type: "text",
      placeholder: "Enter creator or publisher",
      validation: { minLength: 2, maxLength: 100 },
    },
    {
      key: "category",
      label: "Resource Type",
      type: "select",
      required: true,
      options: [
        { label: "E-Book", value: "E-Book" },
        { label: "Database", value: "Database" },
        { label: "Journal", value: "Journal" },
        { label: "Multimedia", value: "Multimedia" },
        { label: "Software", value: "Software" },
        { label: "Online Course", value: "Online Course" },
      ],
      validation: { required: true },
    },
    {
      key: "location",
      label: "Access URL",
      type: "text",
      placeholder: "https://example.com/resource",
      validation: { minLength: 10, maxLength: 500 },
    },
  ],
  statusOptions: [
    { label: "Available", value: "Available" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Restricted", value: "Reserved" }, // Using Reserved for Restricted to match our status type
  ],
  categoryOptions: [
    { label: "E-Book", value: "E-Book" },
    { label: "Database", value: "Database" },
    { label: "Journal", value: "Journal" },
    { label: "Multimedia", value: "Multimedia" },
    { label: "Software", value: "Software" },
    { label: "Online Course", value: "Online Course" },
  ],
}

// Sample data for each library type
export const generalLibraryData: BaseLibraryItem[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    status: "Available",
    addedDate: "2024-01-15",
    location: "A-12-3",
  },
  {
    id: 2,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "978-0-553-38016-3",
    category: "Science",
    status: "Checked Out",
    addedDate: "2024-01-10",
    location: "B-05-7",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    status: "Reserved",
    addedDate: "2024-01-08",
    location: "A-15-2",
  },
]

export const scienceLibraryData: BaseLibraryItem[] = [
  {
    id: 1,
    title: "Nature: International Journal of Science",
    author: "Nature Publishing Group",
    category: "Biology",
    status: "Available",
    addedDate: "2024-01-20",
    location: "Online",
  },
  {
    id: 2,
    title: "Organic Chemistry Laboratory Manual",
    author: "Dr. Sarah Johnson",
    category: "Chemistry",
    status: "Checked Out",
    addedDate: "2024-01-18",
    location: "Lab-C-101",
  },
]

export const digitalLibraryData: BaseLibraryItem[] = [
  {
    id: 1,
    title: "IEEE Digital Library",
    author: "IEEE",
    category: "Database",
    status: "Available",
    addedDate: "2024-01-25",
    location: "Online",
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    author: "MIT OpenCourseWare",
    category: "Online Course",
    status: "Available",
    addedDate: "2024-01-22",
    location: "Online",
  },
]
