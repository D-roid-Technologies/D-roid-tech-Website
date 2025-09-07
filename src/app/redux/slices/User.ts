import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../utils/Types";

const initialState: UserType = {
  firstName: "",
  lastName: "",
  middleName: "",
  initials: "",
  userType: "",
  uniqueId: "",
  staffId: "",
  email: "",
  phone: "",
  agreeToPolicy: false,
  isLoggedIn: false,
  gender: "",
  dateOfBirth: "",
  disability: false,
  disabilityType: "",
  photoUrl: "",
  educationalLevel: "",
  referralName: "",
  secondaryEmail: "",
  securityQuestion: "",
  securityAnswer: "",
  verifiedEmail: false,
  verifyPhoneNumber: false,
  agreedToTerms: false,
  twoFactorSettings: false,
  password: "",
  role: "",
  streetNumber: "",
  streetName: "",
  city: "",
  state: "",
  country: "",
  organisationalType: "",
  isCompanyRegistered: "",
  dateOfRegistration: "",
  skills: [],
  certifications: [],
  accessLevel: "",
  permissions: [],
  notificationPreferences: {
    email: true,
  },

  // Essential fields for Staff Homepage
  position: "",
  department: "",
  employeeId: "",
  joinDate: "",
  performanceScore: 0,
  attendanceRate: 0,
  trainingProgress: 0,
  activeTasks: 0,
  employmentStatus: "",
  workLocation: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserType>>) {
      return { ...state, ...action.payload };
    },

    updateStaffInfo(
      state,
      action: PayloadAction<{
        position?: string;
        department?: string;
        employeeId?: string;
        joinDate?: string;
        employmentStatus?: string;
        workLocation?: string;
      }>
    ) {
      return { ...state, ...action.payload };
    },

    updatePerformanceMetrics(
      state,
      action: PayloadAction<{
        performanceScore?: number;
        attendanceRate?: number;
        trainingProgress?: number;
        activeTasks?: number;
      }>
    ) {
      return { ...state, ...action.payload };
    },

    updateNotificationPreferences(
      state,
      action: PayloadAction<
        Partial<typeof initialState.notificationPreferences>
      >
    ) {
      state.notificationPreferences = {
        ...state.notificationPreferences,
        ...action.payload,
      };
    },

    addSkill(state, action: PayloadAction<string>) {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },

    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },

    addCertification(state, action: PayloadAction<string>) {
      if (!state.certifications.includes(action.payload)) {
        state.certifications.push(action.payload);
      }
    },

    removeCertification(state, action: PayloadAction<string>) {
      state.certifications = state.certifications.filter(
        (cert) => cert !== action.payload
      );
    },

    updateAccessLevel(
      state,
      action: PayloadAction<{
        accessLevel: string;
        permissions: string[];
      }>
    ) {
      state.accessLevel = action.payload.accessLevel;
      state.permissions = action.payload.permissions;
    },

    logoutUser() {
      return { ...initialState };
    },
  },
});

export const {
  setUser,
  updateStaffInfo,
  updatePerformanceMetrics,
  updateNotificationPreferences,
  addSkill,
  removeSkill,
  addCertification,
  removeCertification,
  updateAccessLevel,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserType } from "../../utils/Types";

// const initialState: UserType = {
//   firstName: "",
//   lastName: "",
//   middleName: "",
//   initials: "",
//   userType: "",
//   uniqueId: "",
//   email: "",
//   phone: "",
//   agreeToPolicy: false,
//   isLoggedIn: false,
//   gender: "",
//   dateOfBirth: "",
//   disability: false,
//   disabilityType: "",
//   photoUrl: "",
//   educationalLevel: "",
//   referralName: "",
//   secondaryEmail: "",
//   securityQuestion: "",
//   securityAnswer: "",
//   verifiedEmail: false,
//   verifyPhoneNumber: false,
//   agreedToTerms: false,
//   twoFactorSettings: false,
//   password: "",
//   role: "",
//   streetNumber: "",
//   streetName: "",
//   city: "",
//   state: "",
//   country: "",
//   organisationalType: "",
//   isCompanyRegistered: "",
//   dateOfRegistration: "",

//   // Staff-specific information for homepage
//   position: "",
//   department: "",
//   employeeId: "",
//   joinDate: "",

//   // Performance and work-related data
//   performanceScore: 0,
//   attendanceRate: 0,
//   trainingProgress: 0,
//   activeTasks: 0,

//   // Employment details
//   employmentStatus: "", // e.g., "Active", "On Leave", "Probation"
//   contractType: "", // e.g., "Full-time", "Part-time", "Contract"
//   workLocation: "", // e.g., "Remote", "Office", "Hybrid"
//   reportingManager: "",
//   teamLead: "",

//   // Salary and benefits
//   salaryGrade: "",
//   payrollNumber: "",
//   bankAccount: "",
//   pensionNumber: "",

//   // Additional profile information
//   emergencyContactName: "",
//   emergencyContactPhone: "",
//   emergencyContactRelationship: "",

//   // Skills and certifications
//   skills: [], // Array of skill strings
//   certifications: [], // Array of certification objects

//   // Work preferences
//   preferredWorkingHours: "",
//   timeZone: "",
//   workAnniversary: "",

//   // HR-related fields
//   probationEndDate: "",
//   contractEndDate: "",
//   lastPromotionDate: "",
//   nextReviewDate: "",

//   // Access and permissions
//   accessLevel: "", // e.g., "Basic", "Admin", "Manager"
//   permissions: [], // Array of permission strings

//   // Onboarding and training
//   onboardingStatus: "", // e.g., "Completed", "In Progress", "Not Started"
//   mandatoryTrainingCompleted: false,

//   // Communication preferences
//   notificationPreferences: {
//     email: true,
//     sms: false,
//     push: true,
//     taskUpdates: true,
//     trainingReminders: true,
//     payrollNotifications: true,
//   },
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<Partial<UserType>>) {
//       return { ...state, ...action.payload };
//     },

//     updateStaffInfo(
//       state,
//       action: PayloadAction<{
//         position?: string;
//         department?: string;
//         employeeId?: string;
//         joinDate?: string;
//         reportingManager?: string;
//         teamLead?: string;
//       }>
//     ) {
//       return { ...state, ...action.payload };
//     },

//     updatePerformanceMetrics(
//       state,
//       action: PayloadAction<{
//         performanceScore?: number;
//         attendanceRate?: number;
//         trainingProgress?: number;
//         activeTasks?: number;
//       }>
//     ) {
//       return { ...state, ...action.payload };
//     },

//     updateNotificationPreferences(
//       state,
//       action: PayloadAction<
//         Partial<typeof initialState.notificationPreferences>
//       >
//     ) {
//       state.notificationPreferences = {
//         ...state.notificationPreferences,
//         ...action.payload,
//       };
//     },

//     addSkill(state, action: PayloadAction<string>) {
//       if (!state.skills.includes(action.payload)) {
//         state.skills.push(action.payload);
//       }
//     },

//     removeSkill(state, action: PayloadAction<string>) {
//       state.skills = state.skills.filter((skill) => skill !== action.payload);
//     },

//     addCertification(
//       state,
//       action: PayloadAction<{
//         name: string;
//         issuer: string;
//         dateObtained: string;
//         expiryDate?: string;
//         certificateUrl?: string;
//       }>
//     ) {
//       state.certifications.push(action.payload);
//     },

//     removeCertification(state, action: PayloadAction<string>) {
//       state.certifications = state.certifications.filter(
//         (cert) => cert.name !== action.payload
//       );
//     },

//     updateAccessLevel(
//       state,
//       action: PayloadAction<{
//         accessLevel: string;
//         permissions: string[];
//       }>
//     ) {
//       state.accessLevel = action.payload.accessLevel;
//       state.permissions = action.payload.permissions;
//     },

//     logoutUser() {
//       return { ...initialState };
//     },
//   },
// });

// export const {
//   setUser,
//   updateStaffInfo,
//   updatePerformanceMetrics,
//   updateNotificationPreferences,
//   addSkill,
//   removeSkill,
//   addCertification,
//   removeCertification,
//   updateAccessLevel,
//   logoutUser,
// } = userSlice.actions;

// export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserType } from "../../utils/Types";

// const initialState: UserType = {
//   firstName: "",
//   lastName: "",
//   middleName: "",
//   initials: "",
//   userType: "",
//   uniqueId: "",
//   email: "",
//   phone: "",
//   agreeToPolicy: false,
//   isLoggedIn: false,
//   gender: "",
//   dateOfBirth: "",
//   disability: false,
//   disabilityType: "",
//   photoUrl: "",
//   educationalLevel: "",
//   referralName: "",
//   secondaryEmail: "",
//   securityQuestion: "",
//   securityAnswer: "",
//   verifiedEmail: false,
//   verifyPhoneNumber: false,
//   agreedToTerms: false,
//   twoFactorSettings: false,
//   password: "",
//   role: "",
//   streetNumber: "",
//   streetName: "",
//   city: "",
//   state: "",
//   country: "",
//   organisationalType: "",
//   isCompanyRegistered: "",
//   dateOfRegistration: ""
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<UserType>) {
//       return { ...state, ...action.payload };
//     },
//     logoutUser() {
//       return { ...initialState };
//     },
//   },
// });

// export const { setUser, logoutUser } = userSlice.actions;
// export default userSlice.reducer;
