import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
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
import {
  addTask,
  deleteAllTasks,
  deleteThisTask,
  TaskMain,
} from "../slices/scheduleTask";
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

type Entry = {
  email: string;
  employeeId?: string;
  timestamp: string;
  type: "Sign In" | "Sign Out";
};

type DroidAccount = {
  user: {
    primaryInformation: {
      firstName: string;
      lastName: string;
      initials: string;
      userType: string;
      uniqueId: string;
      email: string;
      agreeToPolicy: boolean;
      isLoggedIn: boolean;
      agreedToTerms: boolean;
      middleName: string;
      phone: string;
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
      twoFactorSettings: boolean;
      password: string;
      role: string;
    };
    location: {
      locationFromDevice: any;
      currentdateTime: {
        date: number;
        month: number;
        year: number;
        time: string;
        formattedDateTime: string;
      };
    };
    affiliates: {
      knowledgeCity: {
        user: boolean;
        kCoin?: {
          amount: number;
          storeCardDetails: boolean;
          mineCoins: {
            numberOfReferals: number;
            numberOfAdsWatched: number;
          };
        };
        courses?: any[];
        notifications?: any[];
        schedules?: any[];
        diaries?: any[];
        lunchBox?: {
          events: any[];
          jobs: any[];
        };
      };
      nerves: {
        user: boolean;
        // connections?: any[];
        // posts?: any[];
        // preferences?: any;
      };
      muzik: {
        user: boolean;
        // playlists?: any[];
        // favorites?: any[];
        // preferences?: any;
      };
    };
  };
  knowledgeCity: {
    kCoin: {
      amount: number;
      storeCardDetails: boolean;
      mineCoins: {
        numberOfReferals: number;
        numberOfAdsWatched: number;
      };
    };
    courses: Record<string, unknown>;
    notifications: Record<string, unknown>;
    schedules: Record<string, unknown>;
    diaries: {
      diaryTitle: string;
      description: string;
      startDate: string;
      endDate: string;
    }[];
    lunchBox: {
      events: {
        eventTitle: string;
        description: string;
        imageLink: string;
        attendees: number;
        createdTime: string;
        createdDate: string;
      }[];
      jobs: {
        jobTitle: string;
        description: string;
        imageLink: string;
        peopleApplied: number;
        createdTime: string;
        createdDate: string;
      }[];
    };
  };
  staff: {
    staffSignInAndOut: any[];
  };
  forms: {
    userForms: any[];
  };
  toolBox: {
    toolBoxInfo: any[];
  };
  muzik: {
    muzikData: any[];
  };
  calculate: {
    calculators: any[];
  };
  schedules: {
    schedule: any[];
  };
  nerves: {
    items: any[];
  };
  announcements: {
    notifications: any[];
  };
  sayit: {
    sayIt: any[];
  };
  tasks: {
    task: any[];
  };
  payslips: {
    paySlip: any[];
  };
  onboarding: {
    onboarding: any[];
  };
  training: {
    trainings: any[];
  };
  progression: {
    progressions: any[];
  };
  resources: {
    resorceses: any[];
  };
};

function getCurrentUserOnce(timeoutMs = 3000): Promise<User | null> {
  const auth = getAuth();
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    let resolved = false;
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (!resolved) {
        resolved = true;
        unlisten();
        resolve(user);
      }
    });

    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        unlisten();
        resolve(auth.currentUser);
      }
    }, timeoutMs);
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
    date
  ).padStart(2, "0")}`;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    year,
    month,
    date,
    time: formattedTime,
    formattedDateTime: `${formattedDate} ${formattedTime}`,
  };
};

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

export function calculateNetSalary(
  logs: LogEntry[],
  grossSalary: number
): { netSalary: number; grossSalary: number; totalDeductions: number } {
  if (!grossSalary || grossSalary <= 0) {
    toast.error(
      `Gross pay cannot be zero or negative - Fill up form in Onboarding first 🚫`,
      {
        style: { background: "#ff4d4f", color: "#fff" },
      }
    );

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
      (a, b) => a.date.getTime() - b.date.getTime()
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
    (h) => h >= 6.5
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

export async function getUserDocByUniqueId(uniqueId: string) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    toast.error("No authenticated user found.", {
      style: { background: "#ff4d4f", color: "#fff" },
    });
    return null;
  }

  const droidAccountCollection = collection(db, "droidaccount");
  const q = query(
    droidAccountCollection,
    where("user.primaryInformation.uniqueId", "==", uniqueId)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const docSnap = querySnapshot.docs[0];
  return docSnap;
}

export function calculateTaxPercentage(grossPay: number, tax: number): number {
  if (grossPay === 0) {
    throw new Error("Gross pay cannot be zero.");
  }
  const percentage = (tax / grossPay) * 100;
  return parseFloat(percentage.toFixed(2));
}

const addDaysToDate = (dateInput: string, daysToAdd: number) => {
  const initialDate = new Date(dateInput);

  if (isNaN(initialDate.getTime())) {
    throw new Error("Invalid date input. Please provide a valid date.");
  }

  initialDate.setDate(initialDate.getDate() + daysToAdd);

  const newDate = {
    year: initialDate.getFullYear(),
    month: initialDate.getMonth() + 1,
    day: initialDate.getDate(),
    fullDate: initialDate.toISOString().split("T")[0],
  };

  return newDate;
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

function getCurrentUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) resolve(user);
        else reject(new Error("User not authenticated"));
      },
      reject
    );
  });
}

export class AuthService {
  async handleUserRegistration(
    userData: UserType,
    locationData: LocationState
  ) {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = res.user;
      const currentDateTime = getCurrentDateTime();

      await updateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      });

      const userDocRef = doc(collection(db, "droidaccount"), user.uid);

      const droidAccount = {
        user: {
          primaryInformation: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            initials:
              `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
            userType: userData.userType,
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
            role: "",
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
            knowledgeCity: {
              user: false, // Changed from true to false
            },
            nerves: {
              user: false, // Default false
            },
            muzik: {
              user: false, // Default false
            },
          },
          onboard: {
            onboarding: [],
            memberStatus: [],
            trainings: [],
            progressions: [],
            userForms: [],
            notifications: [],
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
        },
        toolBox: {
          toolBoxInfo: [],
        },
        calculate: {
          calculators: [],
        },
        schedules: {
          mySchedles: [],
        },
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

  async getAllUsersFromFirestore() {
    try {
      const user = auth.currentUser;
      console.log(user);
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
    }
  }

  async handleUserLogin(email: string, password: string, isStaff: boolean) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDocRef = doc(
        collection(db, "droidaccount"),
        userCredential.user.uid
      );
      const userDocSnap = await getDoc(userDocRef);
      const updatedData = userDocSnap.data();

      if (userDocSnap.exists()) {
        const fetchedUserData = userDocSnap.data();
        const primaryInformation = fetchedUserData.user?.primaryInformation;
        const userForm = fetchedUserData.user?.userForms;
        const userType = primaryInformation?.userType;

        const isUserActuallyStaff = userType === "Staff";

        if (isUserActuallyStaff !== isStaff) {
          await auth.signOut();
          throw new Error(
            isStaff
              ? "This account is not a staff account. Please use the member login."
              : "Staff accounts must log in through the Staff Login portal."
          );
        }

        const updatedEntries =
          updatedData?.user?.staff?.staffSignInAndOut || [];
        const updatedStaffDetails = {
          staffGrossPay:
            updatedData?.user?.staff?.staffDetails?.staffGrossPay || "",
          staffTax: updatedData?.user?.staff?.staffDetails?.staffTax || "",
          staffPosition:
            updatedData?.user?.staff?.staffDetails?.staffPosition || "",
          staffBank: updatedData?.user?.staff?.staffDetails?.staffBank || "",
          staffAccountNmber:
            updatedData?.user?.staff?.staffDetails?.staffAccountNmber || "",
          staffAccountName:
            updatedData?.user?.staff?.staffDetails?.staffAccountName || "",
          staffStartDate:
            updatedData?.user?.staff?.staffDetails?.staffStartDate || "",
        };
        const updatedStaffDocuments = updatedData?.user?.staff?.staffDoc || {};
        const updatedStaffLeave = updatedData?.user?.staff?.staffLeave || [];
        const updatedKnowledgeCity = updatedData?.user?.knowledgeCity || {};
        const updatedNotifications = updatedData?.user?.notifications || [];
        const updatedOnboarding = updatedData?.user?.onboard?.onboarding || [];
        const updatedMemberStatus =
          updatedData?.user?.onboard?.memberStatus || [];
        const updatedTrainings = updatedData?.user?.trainings || [];
        const updatedPayslips = updatedData?.user?.payslips?.paySlip || [];
        const updatedProgressions = updatedData?.user?.progressions || [];
        const schedleData = updatedData?.schedules?.mySchedules || [];
        const toolBoxData = updatedData?.toolBox?.toolBoxInfo || [];
        const calculateData = updatedData?.calculate?.calculators || [];

        store.dispatch(setPayslipData(updatedPayslips));
        store.dispatch(setKnowledgeCity(updatedKnowledgeCity));
        store.dispatch(setTrainings(updatedTrainings));
        store.dispatch(setNotifications(updatedNotifications));
        store.dispatch(setAllMilestones(updatedProgressions));
        store.dispatch(setSignInAndOutData(updatedEntries));
        store.dispatch(setStaffDetails(updatedStaffDetails));

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
          setUser({ ...primaryInformation, role: primaryInformation.role })
        );

        toast.success(`We have successfully logged you into your account.`, {
          style: {
            background: "#4BB543",
            color: "#fff",
          },
        });

        return userCredential;
      } else {
        throw new Error("User information does not exist in database.");
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed", {
        style: {
          background: "#ff4d4f",
          color: "#fff",
        },
      });
      throw err;
    }
  }

  async handlePasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          `Password reset email sent to: ${email}. Please check your inbox.`,
          {
            style: {
              background: "#4BB543",
              color: "#fff",
            },
          }
        );
      })
      .catch((error: any) => {
        toast.error(`${error.message}`, {
          style: {
            background: "#ff4d4f",
            color: "#fff",
          },
        });
      });
  }

  async handleUserSignout(): Promise<void> {
    await signOut(auth)
      .then(() => {
        store.dispatch(logoutUser());
        toast.success(
          `You have successfully signed out of your D'roid Account`,
          {
            style: {
              background: "#4BB543",
              color: "#fff",
            },
          }
        );
      })
      .catch((err) => {
        toast.error(`Error creating your D'roid Account - ${err.message}`, {
          style: {
            background: "#ff4d4f",
            color: "#fff",
          },
        });
      });
  }

  async updatePrimaryInformation(partialUpdateData: Partial<UserType>) {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("User not authenticated", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return;
      }

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        toast.error("User not found", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return;
      }

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
      console.error("Failed to update user information:", error.message);
      toast.error("Failed to update user information", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  }

  async logStaffSignInOut(entry: Entry) {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("No authenticated user found.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return null;
      }

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        toast.error("User document not found.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return null;
      }

      const data = userSnapshot.data();
      const existingEntries = data?.staff?.staffSignInAndOut || [];

      await updateDoc(userDocRef, {
        "user.staff.staffSignInAndOut": arrayUnion(entry),
      });

      const updatedSnapshot = await getDoc(userDocRef);
      const updatedData = updatedSnapshot.data();
      const updatedEntries = updatedData?.staff?.staffSignInAndOut || [];
      const updatedStaffDetails = {
        staffGrossPay: updatedData?.staff?.staffDetails?.staffGrossPay || "",
        staffTax: updatedData?.staff?.staffDetails?.staffTax || "",
        staffPosition: updatedData?.staff?.staffDetails?.staffPosition || "",
        staffBank: updatedData?.staff?.staffDetails?.staffBank || "",
        staffAccountNmber:
          updatedData?.staff?.staffDetails?.staffAccountNmber || "",
        staffAccountName:
          updatedData?.staff?.staffDetails?.staffAccountName || "",
      };
      const updatedStaffDocuments = updatedData?.staff?.staffDoc || {};
      const updatedStaffLeave = updatedData?.staff?.staffLeave || [];

      store.dispatch(setSignInAndOutData(updatedEntries));
      store.dispatch(setStaffDetails(updatedStaffDetails));
      store.dispatch(setStaffDocuments(updatedStaffDocuments));
      store.dispatch(setStaffLeave(updatedStaffLeave));

      toast.success(`${entry.type} recorded at ${entry.timestamp}`, {
        style: { background: "#4BB543", color: "#fff" },
      });

      return entry;
    } catch (error: any) {
      toast.error(`Error logging staff entry: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return null;
    }
  }

  async updateStaffPayslip(payslip: PaySlip) {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("No authenticated user found.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return null;
      }

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        toast.error("User document not found.", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return null;
      }

      const data = userSnapshot.data();
      const existingPayslips = data?.payslips?.paySlip || [];

      const duplicate = existingPayslips.some(
        (item: PaySlip) =>
          item.payPeriod.monthOfPay === payslip.payPeriod.monthOfPay
      );

      if (duplicate) {
        toast.error(
          `Payslip for ${payslip.payPeriod.monthOfPay} already exists.`,
          {
            style: { background: "#faad14", color: "#fff" },
          }
        );
        return null;
      }

      await updateDoc(userDocRef, {
        "payslips.paySlip": arrayUnion(payslip),
      });

      const updatedSnapshot = await getDoc(userDocRef);
      const updatedData = updatedSnapshot.data();
      const updatedPayslips = updatedData?.payslips?.paySlip || [];

      store.dispatch(setPayslipData(updatedPayslips));

      toast.success(
        `Payslip for ${payslip.payPeriod.monthOfPay} updated successfully.`,
        {
          style: { background: "#4BB543", color: "#fff" },
        }
      );

      return payslip;
    } catch (error: any) {
      toast.error(`Error updating payslip: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return null;
    }
  }

  async updateStaffOnboardingDetails(partialDetails: Partial<StaffDetails>) {
    try {
      console.log(auth.currentUser);

      const currentUser = await getCurrentUser();
      const userId = currentUser.uid;

      const staffDocRef = doc(db, "droidaccount", userId);
      const staffSnapshot = await getDoc(staffDocRef);

      if (!staffSnapshot.exists()) {
        toast.error("Staff record not found", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return;
      }

      const currentData = staffSnapshot.data();
      const updatedDetails = {
        ...currentData?.staff?.staffDetails,
        ...partialDetails,
      };
      console.log("Updated Firestore data:", updatedDetails);

      await updateDoc(staffDocRef, {
        "user.staff.staffDetails": updatedDetails,
        "user.onboard.onboarding": updatedDetails,
      });

      store.dispatch(setStaffDetails(updatedDetails));

      const { setStaffInfo } = await import("../slices/onboarding");
      store.dispatch(setStaffInfo(updatedDetails));

      toast.success("Staff details updated successfully", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch (error: any) {
      console.error("Error updating staff details:", error?.message || error);
      toast.error(error?.message || "Failed to update staff details", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  }

  async updateAffiliatesData(partialAffiliates: any) {
    try {
      const currentUser = await getCurrentUser();
      const userId = currentUser.uid;

      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        toast.error("User record not found", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return;
      }

      const currentData = userSnapshot.data();
      const currentAffiliates = currentData?.user?.affiliates || {};

      // Deep merge to preserve existing data
      const updatedAffiliates = {
        knowledgeCity: {
          ...currentAffiliates.knowledgeCity,
          ...partialAffiliates.knowledgeCity,
        },
        nerves: {
          ...currentAffiliates.nerves,
          ...partialAffiliates.nerves,
        },
        muzik: {
          ...currentAffiliates.muzik,
          ...partialAffiliates.muzik,
        },
      };

      console.log("✅ Updated affiliates data:", updatedAffiliates);

      // Update Firestore
      await updateDoc(userDocRef, {
        "user.affiliates": updatedAffiliates,
      });

      toast.success("Connected apps updated successfully", {
        style: { background: "#4BB543", color: "#fff" },
      });

      return updatedAffiliates;
    } catch (error: any) {
      console.error("🔥 Error updating affiliates:", error?.message || error);
      toast.error(error?.message || "Failed to update connected apps", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    return getCurrentUser();
  }

  async updateSecuritySettings(partialSecurity: Partial<any>) {
    try {
      const currentUser = await getCurrentUser();
      const userId = currentUser.uid;

      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        toast.error("User record not found", {
          style: { background: "#ff4d4f", color: "#fff" },
        });
        return;
      }

      const currentData = userSnapshot.data();

      const updatedSecurity = {
        ...currentData?.user?.security,
        ...partialSecurity,
      };

      console.log("✅ Updated security data:", updatedSecurity);

      await updateDoc(userDocRef, {
        "user.security": updatedSecurity,
      });

      toast.success("Security settings updated successfully", {
        style: { background: "#4BB543", color: "#fff" },
      });
    } catch (error: any) {
      console.error("🔥 Error updating security:", error?.message || error);
      toast.error(error?.message || "Failed to update security settings", {
        style: { background: "#ff4d4f", color: "#fff" },
      });
    }
  }

  async handleCreateTask(task: Task) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);

      const cleanedTask = removeUndefined(task);

      await updateDoc(userDocRef, {
        "schedules.mySchedles": arrayUnion(cleanedTask),
      });

      store.dispatch(addTask(cleanedTask));

      toast.success("Task added successfully! 🎉", {
        style: { background: "#4BB543", color: "#fff" },
      });

      return cleanedTask;
    } catch (error: any) {
      toast.error(`Error creating task: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return null;
    }
  }

  async handleGetTasks() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");
      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        throw new Error("User document not found");
      }

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

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);

      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) throw new Error("User document not found");

      const tasks: Task[] = userSnapshot.data()?.schedules?.mySchedles || [];

      const taskToDelete = tasks.find((t) => t.id === taskId);
      if (!taskToDelete) {
        toast.error("Task not found", {
          style: { background: "#faad14", color: "#fff" },
        });
        return null;
      }

      await updateDoc(userDocRef, {
        "schedules.mySchedles": arrayRemove(taskToDelete),
      });

      store.dispatch(deleteThisTask(taskId));

      toast.success("Task deleted successfully 🗑️", {
        style: { background: "#4BB543", color: "#fff" },
      });

      return taskId;
    } catch (error: any) {
      toast.error(`Error deleting task: ${error.message}`, {
        style: { background: "#ff4d4f", color: "#fff" },
      });
      return null;
    }
  }

  async handleUpdateTask(updatedTask: TaskMain) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");

      const userId = currentUser.uid;
      const userDocRef = doc(db, "droidaccount", userId);

      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) throw new Error("User document not found");

      const tasks: TaskMain[] =
        userSnapshot.data()?.schedules?.mySchedles ?? [];

      const updatedTasks = tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );

      await updateDoc(userDocRef, { "schedules.mySchedles": updatedTasks });

      store.dispatch(deleteThisTask(updatedTask.id));
      store.dispatch(addTask(updatedTask));

      return updatedTask;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update task");
    }
  }
}

export const authService = new AuthService();
