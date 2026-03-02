import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../../firebase";
import { LocationState, Task, UserType } from "../../utils/Types";
import { setKnowledgeCity } from "../slices/knowledgeCity";
import { setNotifications } from "../slices/notificationSlice";
import { PaySlip, setPayslipData } from "../slices/paySlipSlice";
import { setAllMilestones } from "../slices/ProgressionSlice";
import { addTask, deleteThisTask, TaskMain } from "../slices/scheduleTask";
import {
  setSignInAndOutData,
  setStaffDetails,
  setStaffDocuments,
  setStaffLeave,
  StaffDetails,
} from "../slices/SignInAndOutSlice";
import { setTrainings } from "../slices/TrainingsSlice";
import { setCalculate, setSchedules, setToolBox } from "../slices/TSCSlice";
import { logoutUser, setUser } from "../slices/User";
import { store } from "../Store";

// --- TYPES ---
type Entry = {
  email: string;
  employeeId?: string;
  timestamp: string;
  type: "Sign In" | "Sign Out";
};

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: string;
  isRead: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  lastUpdated?: string;
}

// --- HELPER FUNCTIONS ---

function getCurrentUserPromise(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) resolve(user);
        else reject(new Error("User not authenticated"));
      },
      reject,
    );
  });
}

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
    date,
  ).padStart(2, "0")}`;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    year,
    month,
    date,
    time: formattedTime,
    formattedDateTime: `${formattedDate} ${formattedTime}`,
  };
};

function removeUndefined(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined);
  } else if (obj && typeof obj === "object") {
    return Object.entries(obj)
      .filter(([, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = removeUndefined(value);
        return acc;
      }, {} as any);
  }
  return obj;
}

type LogEntry = {
  email: string;
  employeeId?: string;
  timestamp: string;
  type: "Sign In" | "Sign Out";
  note?: string;
};

function parseDate(timestamp: string): Date {
  const isoDate = Date.parse(timestamp);
  if (!isNaN(isoDate)) return new Date(isoDate);

  const [datePart, timePart] = timestamp.split(", ");
  const [day, month, year] = datePart.split("/");
  return new Date(`${year}-${month}-${day}T${timePart}`);
}

// --- EXPORTED FUNCTIONS ---

export function calculateNetSalary(
  logs: LogEntry[],
  grossSalary: number,
): { netSalary: number; grossSalary: number; totalDeductions: number } {
  if (!grossSalary || grossSalary <= 0) {
    return {
      netSalary: 0,
      grossSalary: 0,
      totalDeductions: 0,
    };
  }

  const dailyDurations: Record<string, number> = {};
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const normalizedLogs = logs.map((log) => ({
    ...log,
    date: parseDate(log.timestamp),
  }));

  const logsByDay: Record<
    string,
    { type: "Sign In" | "Sign Out"; date: Date }[]
  > = {};

  for (const log of normalizedLogs) {
    if (
      log.date.getMonth() === currentMonth &&
      log.date.getFullYear() === currentYear
    ) {
      const key = log.date.toISOString().split("T")[0];
      if (!logsByDay[key]) logsByDay[key] = [];
      logsByDay[key].push({ type: log.type, date: log.date });
    }
  }

  for (const date in logsByDay) {
    const events = logsByDay[date].sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
    let totalHours = 0;
    for (let i = 0; i < events.length - 1; i += 2) {
      if (events[i].type === "Sign In" && events[i + 1]?.type === "Sign Out") {
        const duration =
          (events[i + 1].date.getTime() - events[i].date.getTime()) /
          (1000 * 60 * 60);
        totalHours += duration;
      }
    }
    dailyDurations[date] = totalHours;
  }

  const qualifyingDays = Object.values(dailyDurations).filter(
    (h) => h >= 6.5,
  ).length;
  let totalDeduction = 0;

  if (qualifyingDays < 28) {
    for (const hours of Object.values(dailyDurations)) {
      if (hours < 6.5) {
        const shortfall = 6.5 - hours;
        const deductionUnits = Math.floor(shortfall / (2 / 3));
        totalDeduction += deductionUnits * 0.005;
      }
    }
  }

  const netSalary = parseFloat((grossSalary - totalDeduction).toFixed(2));
  return {
    netSalary,
    grossSalary,
    totalDeductions: parseFloat(totalDeduction.toFixed(2)),
  };
}

export function calculateTaxPercentage(grossPay: number, tax: number): number {
  if (grossPay === 0) {
    throw new Error("Gross pay cannot be zero.");
  }
  const percentage = (tax / grossPay) * 100;
  return parseFloat(percentage.toFixed(2));
}

export async function getUserDocByUniqueId(uniqueId: string) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return null;
  }
  const droidAccountCollection = collection(db, "droidaccount");
  const q = query(
    droidAccountCollection,
    where("user.primaryInformation.uniqueId", "==", uniqueId),
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  const docSnap = querySnapshot.docs[0];
  return docSnap;
}

export class AuthService {
  async getCurrentUser(): Promise<User> {
    return getCurrentUserPromise();
  }

  //  1. AUTHENTICATION & REGISTRATION

  async handleUserRegistration(
    userData: UserType,
    locationData: LocationState,
  ) {
    if (
      typeof navigator !== "undefined" &&
      /Android/i.test(navigator.userAgent) &&
      (userData.userType === "Member" || userData.userType === "Staff")
    ) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.devekene.DroidOne&hl=en";
      return new Promise<any>(() => {});
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const user = res.user;
      const currentDateTime = getCurrentDateTime();

      const displayName =
        userData.userType === "Organisation"
          ? userData.firstName
          : `${userData.firstName} ${userData.lastName}`;

      await updateProfile(user, {
        displayName: displayName,
      });

      const userDocRef = doc(collection(db, "droidaccount"), user.uid);

      const isStaff =
        userData.userType?.toLowerCase() === "staff" ||
        userData.userType?.toLowerCase() === "admin";

      const isOrganisation = userData.userType === "Organisation";

      let initialNotifications: any[] = [];

      if (isStaff) {
        initialNotifications.push(this.createOnboardingNotification());
      }

      if (isOrganisation) {
        initialNotifications.push(this.createOrgOnboardingNotification());
      }

      const droidAccount = {
        user: {
          primaryInformation: {
            firstName: userData.firstName,
            lastName: isOrganisation ? "Organisation" : userData.lastName,
            initials: isOrganisation
              ? userData.firstName.substring(0, 2).toUpperCase()
              : `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
            userType: userData.userType,
            organisationalType: userData.organisationalType || "",
            staffId: userData.uniqueId,
            uniqueId: user.uid,
            email: userData.email,
            agreeToPolicy: userData.agreeToPolicy,
            isLoggedIn: true,
            agreedToTerms: true,
            middleName: "",
            phone: "",
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
            twoFactorSettings: false,
            password: "",
            role: userData.role || "",
            streetNumber: "",
            streetName: "",
            city: "",
            state: "",
            country: "",
          },
          location: {
            locationFromDevice: locationData,
            currentdateTime: currentDateTime,
          },
          security: {},
          affiliates: {
            knowledgeCity: { user: false },
            nerves: { user: false },
            muzik: { user: false },
          },
          onboard: {
            onboarding: [],
            memberStatus: [],
            trainings: [],
            progressions: [],
            userForms: [],
            notifications: initialNotifications,
          },
          staff: {
            paySlip: [],
            staffDetails: {},
            staffDoc: {},
            staffLeave: [],
            staffSignInAndOut: [],
            tasks: [],
            tests: [],
          },
          organisation: isOrganisation
            ? {
                employees: [],
                departments: [],
                classrooms: [],
              }
            : {},
        },
        toolBox: { toolBoxInfo: [] },
        calculate: { calculators: [] },
        schedules: { mySchedles: [] },
      };

      await setDoc(userDocRef, droidAccount);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const fetchedUserData = userSnapshot.data();
        const primaryInformation = fetchedUserData.user.primaryInformation;

        store.dispatch(setUser({ ...primaryInformation }));

        await sendEmailVerification(user);
        await signOut(auth);

        toast.success(`Your D'roid Account has been successfully created`, {
          style: { background: "#4BB543", color: "#fff" },
        });

        return { success: true };
      } else {
        toast.error("User Information does not exist 🚫", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return null;
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error(`Error creating your D'roid Account 🚫`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return null;
    }
  }

  async handleUserLogin(
    email: string,
    password: string,
    expectedRole: "Staff" | "Organisation" | "Member",
  ) {
    if (
      typeof navigator !== "undefined" &&
      /Android/i.test(navigator.userAgent) &&
      (expectedRole === "Member" || expectedRole === "Staff")
    ) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.devekene.DroidOne&hl=en";
      return new Promise<any>(() => {});
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userDocRef = doc(
        collection(db, "droidaccount"),
        userCredential.user.uid,
      );
      const userDocSnap = await getDoc(userDocRef);
      const updatedData = userDocSnap.data();

      if (userDocSnap.exists()) {
        const fetchedUserData = userDocSnap.data();
        const primaryInformation = fetchedUserData.user?.primaryInformation;
        const userType = primaryInformation?.userType;

        // Role Validation
        if (expectedRole === "Staff") {
          const isStaffAccount =
            userType?.toLowerCase() === "staff" ||
            userType?.toLowerCase() === "admin";
          if (!isStaffAccount) {
            await auth.signOut();
            throw new Error(
              "This is a Staff Portal. Please use the Member or Organization login.",
            );
          }
        } else if (expectedRole === "Organisation") {
          const isOrgAccount = userType === "Organisation";
          if (!isOrgAccount) {
            await auth.signOut();
            throw new Error(
              "This is an Organization Portal. Please use the Staff or Member login.",
            );
          }
        }

        // Check for Missing Organization Details
        if (userType === "Organisation") {
          const { phone, streetName, city, country } = primaryInformation;
          const isProfileComplete = phone && streetName && city && country;

          let currentNotifications =
            fetchedUserData.user?.onboard?.notifications || [];

          if (!isProfileComplete) {
            const hasNotification = currentNotifications.some(
              (n: any) => n.title === "Complete Organization Profile",
            );

            if (!hasNotification) {
              const orgNotif = this.createOrgOnboardingNotification();
              currentNotifications = [orgNotif, ...currentNotifications];

              await updateDoc(userDocRef, {
                "user.onboard.notifications": currentNotifications,
              });

              if (updatedData?.user?.onboard) {
                updatedData.user.onboard.notifications = currentNotifications;
              }
            }
          }
        }

        // Dispatch Data
        const updatedEntries =
          updatedData?.user?.staff?.staffSignInAndOut || [];
        const updatedStaffDetails =
          updatedData?.user?.staff?.staffDetails || {};
        const updatedStaffDocuments = updatedData?.user?.staff?.staffDoc || {};
        const updatedStaffLeave = updatedData?.user?.staff?.staffLeave || [];
        const updatedKnowledgeCity = updatedData?.user?.knowledgeCity || {};
        const updatedTrainings = updatedData?.user?.trainings || [];
        const updatedPayslips = updatedData?.user?.payslips?.paySlip || [];
        const updatedProgressions = updatedData?.user?.progressions || [];
        const schedleData = updatedData?.schedules?.mySchedules || [];
        const toolBoxData = updatedData?.toolBox?.toolBoxInfo || [];
        const calculateData = updatedData?.calculate?.calculators || [];
        const firestoreNotifications =
          updatedData?.user?.onboard?.notifications || [];

        store.dispatch(setPayslipData(updatedPayslips));
        store.dispatch(setKnowledgeCity(updatedKnowledgeCity));
        store.dispatch(setTrainings(updatedTrainings));
        store.dispatch(setAllMilestones(updatedProgressions));
        store.dispatch(setSignInAndOutData(updatedEntries));
        store.dispatch(setStaffDetails(updatedStaffDetails));
        store.dispatch(setNotifications(firestoreNotifications));

        try {
          const { setStaffInfo } = await import("../slices/onboarding");
          store.dispatch(setStaffInfo(updatedStaffDetails));
        } catch (_) {}

        store.dispatch(setStaffDocuments(updatedStaffDocuments));
        store.dispatch(setToolBox(toolBoxData));
        store.dispatch(setCalculate(calculateData));
        store.dispatch(setSchedules(schedleData));
        store.dispatch(setStaffLeave(updatedStaffLeave));
        store.dispatch(
          setUser({ ...primaryInformation, role: primaryInformation.role }),
        );

        try {
          const { notificationsService } =
            await import("../../ui/notificationService/notifications.service");
          await notificationsService.initializeNotifications();
        } catch (error) {
          console.error("Failed to initialize notifications:", error);
        }

        toast.success(`We have successfully logged you into your account.`, {
          style: { background: "#4BB543", color: "#fff" },
        });

        return userCredential;
      } else {
        throw new Error("User information does not exist in database.");
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw err;
    }
  }

  async handleUserSignout(): Promise<void> {
    await signOut(auth)
      .then(() => {
        store.dispatch(logoutUser());
        toast.success(`You have successfully signed out`, {
          style: { background: "#4BB543", color: "#fff" },
        });
      })
      .catch((err) => {
        toast.error(`Error signing out - ${err.message}`, {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  }

  async handlePasswordReset(email: string): Promise<void> {
    if (
      typeof navigator !== "undefined" &&
      /Android/i.test(navigator.userAgent)
    ) {
      try {
        const q = query(
          collection(db, "droidaccount"),
          where("user.primaryInformation.email", "==", email),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          const userType = data.user?.primaryInformation?.userType;

          if (userType === "Member" || userType === "Staff") {
            window.location.href =
              "https://play.google.com/store/apps/details?id=com.devekene.DroidOne&hl=en";
            return new Promise<void>(() => {});
          }
        }
      } catch (error) {
        console.error("Error checking user type for Android redirect:", error);
      }
    }

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(`Password reset email sent to: ${email}`, {
          style: { background: "#4BB543", color: "#fff" },
        });
      })
      .catch((error: any) => {
        toast.error(`${error.message}`, {
          style: { background: "#ff4d4f", color: "#fff" },
        });
      });
  }

  //  2. ORGANIZATION & STAFF MANAGEMENT

  async searchMemberByUniqueId(uniqueId: string) {
    try {
      const q = query(
        collection(db, "droidaccount"),
        where("user.primaryInformation.staffId", "==", uniqueId),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No member found with this ID", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return null;
      }

      const docSnap = querySnapshot.docs[0];
      const userData = docSnap.data();

      if (userData.user.primaryInformation.userType !== "Member") {
        toast.error(
          "This ID belongs to an Organization or Staff, not a Member.",
          { style: { background: "#faad14", color: "#fff" } },
        );
        return null;
      }

      return {
        uid: docSnap.id,
        ...userData.user.primaryInformation,
        photoUrl: userData.user.primaryInformation.photoUrl || "",
      };
    } catch (error: any) {
      console.error("Error searching member:", error);
      toast.error(`Search failed: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return null;
    }
  }

  // UPDATED: Now accepts optional assignedClass
  async addStaffToOrganization(
    memberUid: string,
    staffDetails: {
      department: string;
      role: string;
      jobTitle: string;
      startDate: string;
      staffCategory?: string;
    },
    assignedClass?: { id: string; name: string; classroomId: string } | null,
  ) {
    try {
      const currentUser = await this.getCurrentUser();

      const orgRef = doc(db, "droidaccount", currentUser.uid);
      const orgSnap = await getDoc(orgRef);
      if (!orgSnap.exists()) throw new Error("Organization profile not found.");

      const memberRef = doc(db, "droidaccount", memberUid);
      const memberSnap = await getDoc(memberRef);
      if (!memberSnap.exists()) throw new Error("Member profile not found.");

      const memberData = memberSnap.data();
      const memberInfo = memberData.user.primaryInformation;

      const newEmployeeEntry = {
        uid: memberUid,
        uniqueId: memberInfo.uniqueId,
        firstName: memberInfo.firstName,
        lastName: memberInfo.lastName,
        email: memberInfo.email,
        photoUrl: memberInfo.photoUrl,
        ...staffDetails,
        assignedClass: assignedClass || null, // Link Class
        dateAdded: new Date().toISOString(),
        status: "Active",
      };

      // 1. Add to Employees
      await updateDoc(orgRef, {
        "user.organisation.employees": arrayUnion(newEmployeeEntry),
      });

      // 2. If Class Assigned, Update the Classroom
      if (assignedClass) {
        await this.assignStaffToClass(
          assignedClass.classroomId,
          assignedClass.id,
          memberUid,
          `${memberInfo.firstName} ${memberInfo.lastName}`,
        );
      }

      toast.success(
        `${memberInfo.firstName} successfully added to your staff list!`,
        { style: { background: "#4BB543", color: "#fff" } },
      );

      return newEmployeeEntry;
    } catch (error: any) {
      console.error("Error adding staff:", error);
      toast.error(`Failed to add staff: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  async getOrganizationEmployees() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return [];

      const orgRef = doc(db, "droidaccount", currentUser.uid);
      const orgSnap = await getDoc(orgRef);

      if (orgSnap.exists()) {
        return orgSnap.data().user?.organisation?.employees || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  }

  async deleteStaffFromOrganization(staffUid: string) {
    try {
      const currentUser = await this.getCurrentUser();

      const orgRef = doc(db, "droidaccount", currentUser.uid);
      const orgSnap = await getDoc(orgRef);

      if (orgSnap.exists()) {
        const employees = orgSnap.data().user?.organisation?.employees || [];
        const updatedEmployees = employees.filter(
          (emp: any) => emp.uid !== staffUid,
        );

        await updateDoc(orgRef, {
          "user.organisation.employees": updatedEmployees,
        });

        toast.success("Staff member removed successfully", {
          style: { background: "#4BB543", color: "#fff" },
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error deleting staff:", error);
      toast.error(`Failed to remove staff: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  // --- NEW: Assign Staff to Class (Bi-directional Update) ---
  async assignStaffToClass(
    classroomId: string,
    classId: string,
    staffId: string,
    staffName?: string,
  ) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("Organization data not found");
      const data = docSnap.data();

      let classrooms = data.user.organisation.classrooms || [];
      let employees = data.user.organisation.employees || [];

      // 1. Update Classroom: Find class and set teacherId
      let className = "";
      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              className = `${cr.name} - ${cl.name}`;
              return {
                ...cl,
                teacherId: staffId,
                teacherName: staffName || "Assigned Teacher",
              };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      // 2. Update Employee: Find staff and set assignedClass
      const updatedEmployees = employees.map((emp: any) => {
        if (emp.uid === staffId) {
          return {
            ...emp,
            assignedClass: {
              id: classId,
              classroomId: classroomId,
              name: className,
            },
          };
        }
        return emp;
      });

      // 3. Write both updates
      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
        "user.organisation.employees": updatedEmployees,
      });

      return true;
    } catch (error) {
      console.error("Error assigning staff:", error);
      throw error;
    }
  }

  // --- NEW: Assign Head Teacher to Classroom (Level 1) ---
  async assignHeadTeacherToClassroom(
    classroomId: string,
    staffId: string,
    staffName: string,
  ) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("Organization data not found");
      const data = docSnap.data();
      let classrooms = data.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          return { ...cr, headTeacherId: staffId, headTeacherName: staffName };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // --- NEW: Update School Fees for Class (Level 2) ---
  async updateClassFees(classroomId: string, classId: string, amount: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("Organization data not found");
      const data = docSnap.data();
      let classrooms = data.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              return { ...cl, schoolFees: amount };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  //  3. CLASSROOM & STUDENT HIERARCHY

  async getOrganizationClassrooms() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return [];
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data().user?.organisation?.classrooms || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      return [];
    }
  }

  async addClassroom(classroomName: string, description: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const newClassroom = {
        id: crypto.randomUUID(),
        name: classroomName,
        description: description,
        classes: [],
        dateCreated: new Date().toISOString(),
      };

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": arrayUnion(newClassroom),
      });
      return newClassroom;
    } catch (error: any) {
      console.error("Error adding classroom:", error);
      throw error;
    }
  }

  async updateClassroom(classroomId: string, newName: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("User data not found");
      const data = docSnap.data();
      const classrooms = data.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) =>
        cr.id === classroomId ? { ...cr, name: newName } : cr,
      );

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteClassroom(classroomId: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("User data not found");
      const data = docSnap.data();
      const classrooms = data.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.filter(
        (cr: any) => cr.id !== classroomId,
      );

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async addClassToClassroom(classroomId: string, className: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("User data not found");
      const data = docSnap.data();
      const classrooms = data.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const newClass = {
            id: crypto.randomUUID(),
            name: className,
            students: [],
            teacherId: null, // Initialize teacherId
            dateCreated: new Date().toISOString(),
          };
          return { ...cr, classes: [...(cr.classes || []), newClass] };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      console.error("Error adding class:", error);
      throw error;
    }
  }

  async updateClass(classroomId: string, classId: string, newName: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      const data = docSnap.exists() ? docSnap.data() : null;
      const classrooms = data?.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) =>
            cl.id === classId ? { ...cl, name: newName } : cl,
          );
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteClass(classroomId: string, classId: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      const data = docSnap.exists() ? docSnap.data() : null;
      const classrooms = data?.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).filter(
            (cl: any) => cl.id !== classId,
          );
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async addStudentToClass(
    classroomId: string,
    classId: string,
    studentData: any,
  ) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) throw new Error("User data not found");
      const data = docSnap.data();
      const classrooms = data.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              const newStudent = {
                id: crypto.randomUUID(),
                ...studentData,
                dateAdded: new Date().toISOString(),
              };
              return { ...cl, students: [...(cl.students || []), newStudent] };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(
    classroomId: string,
    classId: string,
    studentId: string,
    newData: any,
  ) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      const data = docSnap.exists() ? docSnap.data() : null;
      const classrooms = data?.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              const updatedStudents = (cl.students || []).map((s: any) =>
                s.id === studentId ? { ...s, ...newData } : s,
              );
              return { ...cl, students: updatedStudents };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(classroomId: string, classId: string, studentId: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      const data = docSnap.exists() ? docSnap.data() : null;
      const classrooms = data?.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              const updatedStudents = (cl.students || []).filter(
                (s: any) => s.id !== studentId,
              );
              return { ...cl, students: updatedStudents };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // --- New Methods for Manage Student & Documents ---

  async updateStudentDetails(
    classroomId: string,
    classId: string,
    studentId: string,
    studentDetails: any,
  ) {
    return this.updateStudent(classroomId, classId, studentId, studentDetails);
  }

  // UPDATED: Now saves Base64 directly to Firestore array
  async addStudentDocument(
    classroomId: string,
    classId: string,
    studentId: string,
    documentData: {
      name: string;
      fileData: string;
      type: string;
      size: number;
    },
  ) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      const data = docSnap.exists() ? docSnap.data() : null;
      const classrooms = data?.user.organisation.classrooms || [];

      const newDoc = {
        id: crypto.randomUUID(),
        ...documentData,
        dateAdded: new Date().toISOString(),
      };

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              const updatedStudents = (cl.students || []).map((s: any) => {
                if (s.id === studentId) {
                  return { ...s, documents: [...(s.documents || []), newDoc] };
                }
                return s;
              });
              return { ...cl, students: updatedStudents };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });

      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
      return newDoc;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudentDocument(
    classroomId: string,
    classId: string,
    studentId: string,
    documentId: string,
  ) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const docSnap = await getDoc(userDocRef);
      const data = docSnap.exists() ? docSnap.data() : null;
      const classrooms = data?.user.organisation.classrooms || [];

      const updatedClassrooms = classrooms.map((cr: any) => {
        if (cr.id === classroomId) {
          const updatedClasses = (cr.classes || []).map((cl: any) => {
            if (cl.id === classId) {
              const updatedStudents = (cl.students || []).map((s: any) => {
                if (s.id === studentId) {
                  return {
                    ...s,
                    documents: (s.documents || []).filter(
                      (d: any) => d.id !== documentId,
                    ),
                  };
                }
                return s;
              });
              return { ...cl, students: updatedStudents };
            }
            return cl;
          });
          return { ...cr, classes: updatedClasses };
        }
        return cr;
      });
      await updateDoc(userDocRef, {
        "user.organisation.classrooms": updatedClassrooms,
      });
    } catch (e) {
      throw e;
    }
  }

  async getSchoolStats() {
    try {
      const classrooms = await this.getOrganizationClassrooms();
      let totalStudents = 0;
      let activeClasses = 0;
      classrooms.forEach((cr: any) => {
        if (cr.classes) {
          activeClasses += cr.classes.length;
          cr.classes.forEach((cl: any) => {
            if (cl.students) totalStudents += cl.students.length;
          });
        }
      });
      return { totalStudents, activeClasses };
    } catch (error) {
      return { totalStudents: 0, activeClasses: 0 };
    }
  }

  //  4. UTILITY METHODS (Fixes missing errors)

  async updatePrimaryInformation(partialUpdateData: Partial<UserType>) {
    try {
      const currentUser = await this.getCurrentUser();

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) throw new Error("User not found");

      const currentData = userSnapshot.data();
      const updatedPrimaryInfo = {
        ...currentData.user.primaryInformation,
        ...partialUpdateData,
      };

      await updateDoc(userDocRef, {
        "user.primaryInformation": updatedPrimaryInfo,
      });

      store.dispatch(setUser(updatedPrimaryInfo));
      toast.success("User information updated successfully", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch (error: any) {
      console.error("Failed to update user info:", error);
      toast.error("Failed to update user information");
    }
  }

  async updateStaffOnboardingDetails(partialDetails: Partial<StaffDetails>) {
    try {
      const currentUser = await getCurrentUserPromise();
      const userId = currentUser.uid;
      const staffDocRef = doc(db, "droidaccount", userId);
      const staffSnapshot = await getDoc(staffDocRef);

      if (!staffSnapshot.exists()) throw new Error("Staff record not found");

      const currentData = staffSnapshot.data();
      const updatedDetails = {
        ...currentData?.staff?.staffDetails,
        ...partialDetails,
      };

      await updateDoc(staffDocRef, {
        "user.staff.staffDetails": updatedDetails,
        "user.onboard.onboarding": updatedDetails,
      });

      store.dispatch(setStaffDetails(updatedDetails));
      try {
        const { setStaffInfo } = await import("../slices/onboarding");
        store.dispatch(setStaffInfo(updatedDetails));
      } catch (_) {}

      toast.success("Staff details updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update staff details");
    }
  }

  async updateAffiliatesData(partialAffiliates: any) {
    try {
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);

      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) throw new Error("User not found");

      const currentData = userSnapshot.data();
      const currentAffiliates = currentData?.user?.affiliates || {};

      const updatedAffiliates = {
        knowledgeCity: {
          ...currentAffiliates.knowledgeCity,
          ...partialAffiliates.knowledgeCity,
        },
        nerves: { ...currentAffiliates.nerves, ...partialAffiliates.nerves },
        muzik: { ...currentAffiliates.muzik, ...partialAffiliates.muzik },
      };

      await updateDoc(userDocRef, { "user.affiliates": updatedAffiliates });
      return updatedAffiliates;
    } catch (error: any) {
      toast.error("Failed to update affiliates");
      throw error;
    }
  }

  async updateSecuritySettings(partialSecurity: Partial<SecuritySettings>) {
    try {
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);

      const userSnapshot = await getDoc(userDocRef);
      const currentData = userSnapshot.data();
      const currentSecurity = currentData?.user?.security || {};

      const updatedSecurity = {
        ...currentSecurity,
        ...partialSecurity,
        lastUpdated: new Date().toISOString(),
      };

      await updateDoc(userDocRef, { "user.security": updatedSecurity });
      return updatedSecurity;
    } catch (error: any) {
      toast.error("Failed to update security settings");
      throw error;
    }
  }

  async updateStaffPayslip(payslip: PaySlip) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");

      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      await updateDoc(userDocRef, {
        "user.payslips.paySlip": arrayUnion(payslip),
      });

      // Update Redux
      const updatedSnapshot = await getDoc(userDocRef);
      const updatedData = updatedSnapshot.data();
      store.dispatch(
        setPayslipData(updatedData?.user?.payslips?.paySlip || []),
      );

      toast.success("Payslip generated successfully");
      return payslip;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  }

  async logStaffSignInOut(entry: Entry) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");

      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      await updateDoc(userDocRef, {
        "user.staff.staffSignInAndOut": arrayUnion(entry),
      });

      store.dispatch(
        setSignInAndOutData(
          (await getDoc(userDocRef)).data()?.user?.staff?.staffSignInAndOut ||
            [],
        ),
      );
      toast.success(`${entry.type} recorded`, {
        style: { background: "#4BB543", color: "#fff" },
      });
      return entry;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  }

  async handleCreateTask(task: Task) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");

      const cleanedTask = removeUndefined(task);
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      await updateDoc(userDocRef, {
        "schedules.mySchedles": arrayUnion(cleanedTask),
      });

      store.dispatch(addTask(cleanedTask));
      toast.success("Task added!");
      return cleanedTask;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  }

  async handleGetTasks() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) throw new Error("User document not found");
      const data = userSnapshot.data();
      const tasks = data?.schedules?.mySchedles || [];
      return tasks.map((t: any) => ({
        id: t.id || crypto.randomUUID(),
        title: t.title || "",
        desc: t.desc || "",
        dateCreated: t.dateCreated || "",
        dateModified: t.dateModified || "",
        dateDeleted: t.dateDeleted || "",
        completed: t.completed ?? false,
      }));
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      throw new Error(error.message || "Failed to fetch tasks");
    }
  }

  async handleDeleteTask(taskId: string) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);
      const tasks: Task[] = userSnapshot.data()?.schedules?.mySchedles || [];
      const taskToDelete = tasks.find((t) => t.id === taskId);
      if (!taskToDelete) return null;
      await updateDoc(userDocRef, {
        "schedules.mySchedles": arrayRemove(taskToDelete),
      });
      store.dispatch(deleteThisTask(taskId));
      toast.success("Task deleted");
      return taskId;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  }

  async handleUpdateTask(updatedTask: TaskMain) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);
      const tasks: TaskMain[] =
        userSnapshot.data()?.schedules?.mySchedles ?? [];
      const updatedTasks = tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t,
      );
      await updateDoc(userDocRef, { "schedules.mySchedles": updatedTasks });
      store.dispatch(deleteThisTask(updatedTask.id));
      store.dispatch(addTask(updatedTask));
      return updatedTask;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update task");
    }
  }

  // --- Organization Documents ---

  async addOrganizationDocument(documentData: {
    name: string;
    fileData: string;
    type: string;
    size: number;
  }) {
    try {
      const currentUser = await this.getCurrentUser();
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const newDoc = {
        id: crypto.randomUUID(),
        ...documentData,
        dateAdded: new Date().toISOString(),
      };

      await updateDoc(userDocRef, {
        "user.organisation.documents": arrayUnion(newDoc),
      });
      return newDoc;
    } catch (error: any) {
      console.error("Error adding org document:", error);
      throw error;
    }
  }

  async getOrganizationDocuments() {
    try {
      const currentUser = await this.getCurrentUser();
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        return snap.data().user?.organisation?.documents || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching org documents:", error);
      return [];
    }
  }

  async deleteOrganizationDocument(documentId: string) {
    try {
      const currentUser = await this.getCurrentUser();
      const userDocRef = doc(db, "droidaccount", currentUser.uid);

      const snap = await getDoc(userDocRef);
      if (!snap.exists()) throw new Error("User not found");

      const documents = snap.data().user?.organisation?.documents || [];
      const updatedDocuments = documents.filter(
        (d: any) => d.id !== documentId,
      );

      await updateDoc(userDocRef, {
        "user.organisation.documents": updatedDocuments,
      });
      return true;
    } catch (error: any) {
      console.error("Error deleting org document:", error);
      throw error;
    }
  }

  // --- Notification Sync ---
  async syncNotificationsToBackend(notifications: Notification[]) {
    try {
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      await updateDoc(userDocRef, {
        "user.onboard.notifications": notifications,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getNotificationsFromBackend(): Promise<Notification[]> {
    try {
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) return [];
      const data = userSnapshot.data();
      return this.migrateNotifications(
        data?.user?.onboard?.notifications || [],
      );
    } catch (error) {
      return [];
    }
  }

  private migrateNotifications(notifications: any[]): Notification[] {
    if (!Array.isArray(notifications)) return [];
    return notifications
      .map((n, i) => ({
        id: n.id || i + 1,
        title: n.title || "Untitled",
        message: n.message || "",
        date: n.date || new Date().toISOString().split("T")[0],
        time: n.time || new Date().toISOString(),
        type: n.type || "info",
        isRead: n.isRead || false,
      }))
      .filter((n) => n !== null) as Notification[];
  }

  private createOnboardingNotification() {
    return {
      id: Date.now(),
      title: "Complete Your Onboarding",
      message:
        "Please complete your staff onboarding information to access all features.",
      type: "warning",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString(),
      isRead: false,
    };
  }

  private createOrgOnboardingNotification() {
    return {
      id: Date.now() + 1,
      title: "Complete Organization Profile",
      message:
        "Your organization profile is incomplete. Please add your address and contact details.",
      type: "info",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString(),
      isRead: false,
    };
  }
}

export const authService = new AuthService();
