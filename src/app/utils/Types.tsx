export type RouterType = {
  width: number;
};

export type DimensionType = {
  width: number;
  height: number;
};
// export type UserType = {
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   initials: string;
//   userType: string;
//   uniqueId: string;
//   email: string;
//   phone: string;
//   agreeToPolicy: boolean;
//   isLoggedIn: boolean;
//   gender: string;
//   dateOfBirth: string;
//   disability: boolean;
//   disabilityType: string;
//   photoUrl: string;
//   educationalLevel: string;
//   referralName: string;
//   secondaryEmail: string;
//   securityQuestion: string;
//   securityAnswer: string;
//   verifiedEmail: boolean;
//   verifyPhoneNumber: boolean;
//   agreedToTerms: boolean;
//   twoFactorSettings: boolean;
//   password: string;
//   role?: string; // ✅ Added this field
//   streetNumber: string;
//   streetName: string;
//   city: string;
//   state: string;
//   country: string;
//   organisationalType: string;
//   isCompanyRegistered: string;
//   dateOfRegistration: string;
//   skills: string[];
//   certifications: string[];
//   accessLevel: string;
//   permissions: string[];
//   notificationPreferences: {
//     email: boolean;
//   };
// };
export type UserType = {
  id?:string;
  firstName: string;
  lastName: string;
  middleName: string;
  initials: string;
  userType: string;
  uniqueId: string;
  staffId: string;
  email: string;
  phone: string;
  agreeToPolicy: boolean;
  isLoggedIn: boolean;
  gender: string;
  dateOfBirth: string;
  disability: boolean;
  disabilityType: string;
  photoUrl: string;
  educationalLevel: string;
  referralName: string;
  secondaryEmail: string;
  securityQuestion: string;
  securityAnswer: string;
  verifiedEmail: boolean;
  verifyPhoneNumber: boolean;
  agreedToTerms: boolean;
  twoFactorSettings: boolean;
  password: string;
  role?: string;
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  organisationalType: string;
  isCompanyRegistered: string;
  dateOfRegistration: string;
  skills: string[];
  certifications: string[];
  accessLevel: string;
  permissions: string[];
  notificationPreferences: {
    email: boolean;
  };

  // Essential fields for Staff Homepage
  position?: string;
  department?: string;
  employeeId?: string;
  joinDate?: string;

  // Optional performance metrics
  performanceScore?: number;
  attendanceRate?: number;
  trainingProgress?: number;
  activeTasks?: number;
  employmentStatus?: string;
  workLocation?: string;
};

export type ContactType = {
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
  userSubject: string;
  userMessage: string;
};
export type TestimonialType = {
  name: string;
  comapanyName: string;
  position: string;
  serviceType: string;
  message: string;
  testimonials: Array<{
    name: string;
    comapanyName: string;
    position: string;
    serviceType: string;
    message: string;
  }>;
};

export type EmailType = {
  emailFromUser: string;
};

export type AppInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  fFamily?: string;
  fWeight?: number;
  color?: string;
  w?: string;
  h?: number;
  mTop?: number;
  mBottom?: number;
  mAll?: number;
  mRight?: number;
  bRadius?: number;
  pAll?: number;
  pLeft?: number;
  pRight?: number;
  bColor?: string;
  bWidth?: number;
  pHolder: string;
  bagColor?: string;
  isDropdown?: boolean;
  options?: string[];
  onchangeText?: (e: any) => void;
  inputType?: string;
  icon?: React.ReactNode; // Add icon prop
};

export type AppButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  // title: React.ReactNode; // Changed this line to accept ReactNode
  bgColor: string;
  mTop: number;
  mBottom: number;
  mLeft: number;
  mRight: number;
  fWeight?: number;
  bRadius?: number;
  bRadiusColor?: string;
  icon?: React.ReactNode; // Added icon
  onClickButton: () => void;
  // color: string;
};

export type TrainingPhoto = {
  image: string;
  text: string;
};

export type Course = { id: number; title: string };

export type AppEntrySliceType = {
  showModal: boolean;
  showToast: boolean;
  appTitle: string;
  appBody: any;
  toastTitle: string;
};

export type ToastSliceType = {
  showToast: boolean;
  toastTitle: string;
};

export type Testimonailstype = {
  quote: string;
  author: string;
  backgroundImage: string;
  testimonials: string[];
};

export type TechTrainingType = {
  title: string;
  description?: string;
  trainingType?: object[];
  image?: any;
  content?: string;
  trainingProcedure?: {
    stepOne?: string;
    stepTwo?: string;
    stepThree?: string;
  };
  priceNG?: object[];
  priceUK?: object[];
  applicationProcedure?: {
    stepOne?: string;
    stepTwo?: string;
    stepThree?: string;
  };
};

export type SoftwareDevelopmentType = {
  title?: string;
  image?: any;
  desc?: string;
  category?: string[];
  tools?: string[];
  price?: number[];
  currency?: string[];
  procedure?: object[];
  classId?: string;
  path?: string;
  // added
  content?: string;
  description?: string;
};

export type TestimonialTypes = {
  body: string;
  author: string;
  service: string;
  company: string;
  position: string;
  type: string[];
};

export type TestType = {
  question: string;
  options: string[];
  correctAnswer: string;
};
export type GeolocatedProps = {
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
  coords: {
    latitude: number;
    longitude: number;
  } | null;
};

export type Project = {
  id?: string;
  title: string;
  status?: "Completed" | "Ongoing" | "In Communication";
  descriptionUrl: string;
  summary: string;
  startDate: string;
  endDate?: string;
  client: string;
  team: string[];
  imageUrl?: string;
  category?: string;
  price?: string;
  author?: string;
  isBtn?: boolean;
};

interface LocalityInfo {
  administrative: Array<any>;
  informative: Array<any>;
}

export type LocationState = {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  locality: string;
  localityInfo: LocalityInfo;
  localityLanguageRequested: string;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
};

export type ToolProps = {
  onClose?: () => void;
};

export type UserRef = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type Comment = {
  id: string;
  author: UserRef;
  content: string;
  createdAt: string;
  updatedAt?: string;
  reactions?: {
    [emoji: string]: number; // e.g., { 👍: 3, 🚀: 1 }
  };
};

type Attachment = {
  id: string;
  filename: string;
  url: string;
  fileType: string;
  uploadedBy: UserRef;
  uploadedAt: string;
};

type TaskHistoryEntry = {
  id: string;
  timestamp: string;
  action: string; // e.g., 'status_changed', 'assigned', 'title_updated'
  performedBy: UserRef;
  metadata?: Record<string, any>;
};

export type ChecklistItem = {
  id: string;
  title: string;
  checked: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  type?: "task" | "event" | "appointment" | "reminder" | "habit" | "note";
  status:
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "archived"
  | "on_hold"
  | "reopened";
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  category?: string; // e.g., 'work', 'personal', 'health', 'study', 'finance', etc.
  groupId?: string; // formerly 'projectId', can be a project, list, or team
  boardColumn?: string; // e.g., 'To Do', 'Doing', 'Done'
  phaseId?: string; // formerly 'sprintId', generalized
  parentTaskId?: string;
  subtasks?: Task[];
  dependencies?: string[];
  dependents?: string[];
  tags?: string[];
  checklist?: ChecklistItem[];
  assignee?: UserRef;
  collaborators?: UserRef[];
  reporter?: UserRef;
  comments?: Comment[];
  attachments?: Attachment[];
  estimatedHours?: number;
  actualHours?: number;
  startDate?: string;
  endDate?: string; // formerly dueDate, more neutral
  completedAt?: string;
  reminderAt?: string;
  recurring?: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly" | "custom";
  customRecurrenceRule?: string; // iCal RRULE string
  location?: {
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  isPrivate?: boolean;
  isBlocked?: boolean;
  blockReason?: string;
  score?: number; // for prioritization or impact
  feedback?: string;
  linkedResources?: {
    title: string;
    url: string;
  }[];
  auditTrail?: TaskHistoryEntry[];
  createdBy?: UserRef;       // made optional here
  dateCreated?: string;      // made optional here
  dateModified?: string;
  dateDeleted?: string;
};


export type TechStackItem = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export type eventPost = {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  authorAvatar: string
  category: string
  readTime?: string
  image: string
  featured?: boolean
  readMoreLink: string
  content?: string[]
}