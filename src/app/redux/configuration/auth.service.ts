import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, query, where, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../../firebase";
import { LocationState, UserType } from "../../utils/Types";
import { PaySlip, setPayslipData } from "../slices/paySlipSlice";
import { setSignInAndOutData, setStaffDetails, setStaffDocuments, setStaffLeave, StaffDetails } from "../slices/SignInAndOutSlice";
import { logoutUser, setUser } from "../slices/User";
import { store } from "../Store";

type Entry = {
    email: string;
    employeeId?: string;
    timestamp: string;
    type: 'Sign In' | 'Sign Out';
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
            locationFromDevice: any;  // use a specific type if available
            currentdateTime: {
                date: number;
                month: number;
                year: number;
                time: string;
                formattedDateTime: string;
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
        staffSignInAndOut: any[];  // should be typed if structure is known
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
}


const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear(); // Retrieves the full year (e.g., 2024)
    const month = now.getMonth() + 1; // Retrieves the month (0-11), adding 1 to make it 1-12
    const date = now.getDate(); // Retrieves the day of the month (1-31)
    const hours = now.getHours(); // Retrieves the hour (0-23)
    const minutes = now.getMinutes(); // Retrieves the minutes (0-59)
    const seconds = now.getSeconds(); // Retrieves the seconds (0-59)

    // Formatting the date and time as strings
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return {
        year,
        month,
        date,
        time: formattedTime,
        formattedDateTime: `${formattedDate} ${formattedTime}`
    };
}

type LogEntry = {
    email: string;
    employeeId?: string;
    timestamp: string;
    type: 'Sign In' | 'Sign Out';
    note?: string;
};

function parseDate(timestamp: string): Date {
    // Handle both ISO strings and 'DD/MM/YYYY, HH:mm:ss' format
    const isoDate = Date.parse(timestamp);
    if (!isNaN(isoDate)) return new Date(isoDate);

    // Handle manually formatted date
    const [datePart, timePart] = timestamp.split(', ');
    const [day, month, year] = datePart.split('/');
    return new Date(`${year}-${month}-${day}T${timePart}`);
}

export function calculateNetSalary(
    logs: LogEntry[],
    grossSalary: number
): { netSalary: number; grossSalary: number; totalDeductions: number } {
    if (!grossSalary || grossSalary <= 0) {
        toast.error(`Gross pay cannot be zero or negative - Fill up form in Onboarding first 🚫`, {
            style: { background: '#ff4d4f', color: '#fff' },
        });

        return {
            netSalary: 0,
            grossSalary: 0,
            totalDeductions: 0,
        };
    }

    const dailyDurations: Record<string, number> = {};
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentYear = now.getFullYear();

    const normalizedLogs = logs.map(log => ({
        ...log,
        date: parseDate(log.timestamp),
    }));

    const logsByDay: Record<string, { type: 'Sign In' | 'Sign Out'; date: Date }[]> = {};

    for (const log of normalizedLogs) {
        if (
            log.date.getMonth() === currentMonth &&
            log.date.getFullYear() === currentYear
        ) {
            const key = log.date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            if (!logsByDay[key]) logsByDay[key] = [];
            logsByDay[key].push({ type: log.type, date: log.date });
        }
    }

    for (const date in logsByDay) {
        const events = logsByDay[date].sort((a, b) => a.date.getTime() - b.date.getTime());
        let totalHours = 0;
        for (let i = 0; i < events.length - 1; i += 2) {
            if (events[i].type === "Sign In" && events[i + 1]?.type === "Sign Out") {
                const duration =
                    (events[i + 1].date.getTime() - events[i].date.getTime()) / (1000 * 60 * 60);
                totalHours += duration;
            }
        }
        dailyDurations[date] = totalHours;
    }

    const qualifyingDays = Object.values(dailyDurations).filter(h => h >= 6.5).length;
    let totalDeduction = 0;

    if (qualifyingDays < 28) {
        for (const hours of Object.values(dailyDurations)) {
            if (hours < 6.5) {
                const shortfall = 6.5 - hours;
                const deductionUnits = Math.floor(shortfall / (2 / 3)); // 2/3 hour = 40 minutes
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
        toast.error('No authenticated user found.', {
            style: { background: '#ff4d4f', color: '#fff' },
        });
        return null;
    }

    // const userId = currentUser.uid;
    // const userDocRef = doc(db, "droidaccount", userId);
    const droidAccountCollection = collection(db, "droidaccount");
    const q = query(droidAccountCollection, where("user.primaryInformation.uniqueId", "==", uniqueId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    // Assuming uniqueId is unique, get the first document
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
        fullDate: initialDate.toISOString().split("T")[0]
    };

    return newDate;
}

export class AuthService {
    async handleUserRegistration(userData: UserType, locationData: LocationState) {
        try {
            const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const user = res.user;
            const currentDateTime = getCurrentDateTime();

            await sendEmailVerification(user);
            await updateProfile(user, {
                displayName: `${userData.firstName} ${userData.lastName}`,
            });

            const userDocRef = doc(collection(db, "droidaccount"), user.uid);
            const userItems = doc(collection(db, "items"));
            const userCourses = doc(collection(db, "courses"));
            const userBooks = doc(collection(db, "books"));

            const droidAccount = {
                user: {
                    primaryInformation: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        initials: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
                        userType: userData.userType,
                        uniqueId: userData.uniqueId,
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
                        country: ""
                    },
                    location: {
                        locationFromDevice: locationData,
                        currentdateTime: currentDateTime,
                    },
                },
                knowledgeCity: {
                    kCoin: {
                        amount: 0,
                        storeCardDetails: false,
                        mineCoins: {
                            numberOfReferals: 0,
                            numberOfAdsWatched: 0,
                        },
                    },
                    courses: {},
                    notifications: {},
                    schedules: {},
                    diaries: [
                        {
                            diaryTitle: "The Diary Platform",
                            description: "Tell us your thoughts",
                            startDate: currentDateTime.formattedDateTime,
                            endDate: addDaysToDate(currentDateTime.formattedDateTime, 30),
                        },
                    ],
                    lunchBox: {
                        events: [
                            {
                                eventTitle: "D'roid Technologies - Chess Marathon",
                                description: "The Chess Marathon of the year",
                                imageLink: "",
                                attendees: 0,
                                createdTime: currentDateTime.time,
                                createdDate: `${currentDateTime.date}-${currentDateTime.month}-${currentDateTime.year}`,
                            },
                        ],
                        jobs: [
                            {
                                jobTitle: "Front-End Developer - React Js",
                                description: "We are looking for a front end developer in React Js",
                                imageLink: "",
                                peopleApplied: 0,
                                createdTime: currentDateTime.time,
                                createdDate: `${currentDateTime.date}-${currentDateTime.month}-${currentDateTime.year}`,
                            },
                        ],
                    },
                },
                staff: {
                    staffDetails: {
                        staffGrossPay: "",
                        staffTax: "",
                        staffPosition: "",
                        staffBank: "",
                        staffAccountNmber: "",
                        staffAccountName: ""
                    },
                    staffDoc: {
                        nationalId: "",
                        proofOfAddress: "",
                        secSchCertificate: "",
                        uniCertificate: "",
                        birthCertificate: "",
                        medicalDoc: "",
                        signatre: "",
                        pasport: "",
                        marriageCert: "",
                        nyscCert: "",
                        utilityBill: "",
                    },
                    staffLeave: [],
                    staffSignInAndOut: []
                },
                forms: {
                    userForms: []
                },
                toolBox: {
                    toolBoxInfo: []
                },
                muzik: {
                    muzikData: []
                },
                calculate: {
                    calculators: []
                },
                schedules: {
                    schedule: []
                },
                nerves: {
                    items: []
                },
                announcements: {
                    notifications: []
                },
                tasks: {
                    task: []
                },
                payslips: {
                    paySlip: []
                },
                onboarding: {
                    onboarding: []
                },
                training: {
                    trainings: []
                },
                progression: {
                    progressions: []
                },
                resources: {
                    resorceses: []
                },
            };

            await setDoc(userDocRef, droidAccount);
            const userSnapshot = await getDoc(userDocRef);

            if (userSnapshot.exists()) {
                const fetchedUserData = userSnapshot.data();
                const primaryInformation = fetchedUserData.user.primaryInformation;
                store.dispatch(setUser({ ...primaryInformation, role: fetchedUserData.user.primaryInformation.role }));
                toast.success(`Your D'roid Account has been successfully created`, {
                    style: { background: '#4BB543', color: '#fff' },
                });
            } else {
                toast.error('User Information does not exist 🚫', {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
            }

            return res; // return userCredential
        } catch (error: any) {
            toast.error(`Error creating your D'roid Account 🚫`, {
                style: { background: '#ff4d4f', color: '#fff' },
            });
            console.error(`Error creating your D'roid Account:`, error.message);
            return null;
        }
    }

    async getAllUsersFromFirestore() {
        try {
            // Step 1: Check if the current user is a Super Admin
            const user = auth.currentUser; // Get the current authenticated user
            console.log(user)
            // if (!user || user.role !== "superAdmin") {
            //     throw new Error("You do not have permission to view all users.");
            // }

            // Step 2: Query Firestore to get all user documents
            // const userCollectionRef = collection(db, "droidaccount");
            // const userSnapshot = await getDocs(userCollectionRef);
            // const usersList: UserType[] = [];

            // userSnapshot.forEach(doc => {
            //     const userData = doc.data();
            //     usersList.push(userData.user.primaryInformation);
            // });

            // // Step 3: Dispatch all the fetched user data to the Redux store
            // store.dispatch(setAllUsers(usersList)); // Dispatching the data to the protected slice
        } catch (error: any) {
            console.error("Error fetching users:", error.message);
        }
    }

    async handleUserLogin(email: string, password: string, isStaff: boolean) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(collection(db, "droidaccount"), userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const fetchedUserData = userDocSnap.data();
                const primaryInformation = fetchedUserData.user?.primaryInformation;
                const userType = primaryInformation?.userType;

                // Validate userType against the login intent
                const isUserActuallyStaff = userType === "Staff";

                if (isUserActuallyStaff !== isStaff) {
                    await auth.signOut();
                    throw new Error(
                        isStaff
                            ? "This account is not a staff account. Please use the member login."
                            : "Staff accounts must log in through the Staff Login portal."
                    );
                }

                // Store and proceed
                store.dispatch(setUser({ ...primaryInformation, role: primaryInformation.role }));

                toast.success(`We have successfully logged you into your account.`, {
                    style: {
                        background: '#4BB543',
                        color: '#fff',
                    },
                });

                return userCredential;
            } else {
                throw new Error("User information does not exist in database.");
            }

        } catch (err: any) {
            toast.error(err.message || "Login failed", {
                style: {
                    background: '#ff4d4f',
                    color: '#fff',
                },
            });
            throw err;
        }
    }

    async handlePasswordReset(email: string): Promise<void> {
        // Sending password reset email
        await sendPasswordResetEmail(auth, email).then(() => {
            toast.success(`Password reset email sent to: ${email}. Please check your inbox.`, {
                style: {
                    background: '#4BB543',
                    color: '#fff',
                },
            });
        }).catch((error: any) => {
            toast.error(`${error.message}`, {
                style: {
                    background: '#ff4d4f',
                    color: '#fff',
                },
            });
        });
    }

    async handleUserSignout(): Promise<void> {
        await signOut(auth).then(() => {
            store.dispatch(logoutUser());
            toast.success(`You have successfully signed out of your D'roid Account`, {
                style: {
                    background: '#4BB543',
                    color: '#fff',
                },
            })
        }).catch((err) => {
            toast.error(`Error creating your D'roid Account - ${err.message}`, {
                style: {
                    background: '#ff4d4f',
                    color: '#fff',
                },
            })
        })
    }

    async updatePrimaryInformation(partialUpdateData: Partial<UserType>) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                toast.error("User not authenticated", {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                toast.error("User not found", {
                    style: { background: '#ff4d4f', color: '#fff' },
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

            // ✅ Update Redux state
            store.dispatch(setUser(updatedPrimaryInfo));

            toast.success("User information updated successfully", {
                style: { background: '#4BB543', color: '#fff' },
            });

        } catch (error: any) {
            console.error("Failed to update user information:", error.message);
            toast.error("Failed to update user information", {
                style: { background: '#ff4d4f', color: '#fff' },
            });
        }
    }

    async logStaffSignInOut(entry: Entry) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                toast.error('No authenticated user found.', {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return null;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                toast.error("User document not found.", {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return null;
            }

            const data = userSnapshot.data();

            // Ensure staff object exists
            const existingEntries = data?.staff?.staffSignInAndOut || [];

            // Add new entry
            await updateDoc(userDocRef, {
                'staff.staffSignInAndOut': arrayUnion(entry),
            });

            // Fetch updated document
            const updatedSnapshot = await getDoc(userDocRef);
            const updatedData = updatedSnapshot.data();
            const updatedEntries = updatedData?.staff?.staffSignInAndOut || [];
            const updatedStaffDetails = {
                staffGrossPay: updatedData?.staff?.staffDetails?.staffGrossPay || "",
                staffTax: updatedData?.staff?.staffDetails?.staffTax || "",
                staffPosition: updatedData?.staff?.staffDetails?.staffPosition || "",
                staffBank: updatedData?.staff?.staffDetails?.staffBank || "",
                staffAccountNmber: updatedData?.staff?.staffDetails?.staffAccountNmber || "",
                staffAccountName: updatedData?.staff?.staffDetails?.staffAccountName || "",
            };
            const updatedStaffDocuments = updatedData?.staff?.staffDoc || {};
            const updatedStaffLeave = updatedData?.staff?.staffLeave || [];

            // Dispatch to Redux
            store.dispatch(setSignInAndOutData(updatedEntries));
            store.dispatch(setStaffDetails(updatedStaffDetails));
            store.dispatch(setStaffDocuments(updatedStaffDocuments));
            store.dispatch(setStaffLeave(updatedStaffLeave));

            toast.success(`${entry.type} recorded at ${entry.timestamp}`, {
                style: { background: '#4BB543', color: '#fff' },
            });

            return entry;

        } catch (error: any) {
            toast.error(`Error logging staff entry: ${error.message}`, {
                style: { background: '#ff4d4f', color: '#fff' },
            });
            return null;
        }
    }

    async updateStaffPayslip(payslip: PaySlip) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                toast.error('No authenticated user found.', {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return null;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, 'droidaccount', userId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                toast.error('User document not found.', {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return null;
            }

            const data = userSnapshot.data();
            const existingPayslips = data?.payslips?.paySlip || [];

            // ✅ Check if a payslip for this month already exists
            const duplicate = existingPayslips.some(
                (item: PaySlip) => item.payPeriod.monthOfPay === payslip.payPeriod.monthOfPay
            );

            if (duplicate) {
                toast.error(`Payslip for ${payslip.payPeriod.monthOfPay} already exists.`, {
                    style: { background: '#faad14', color: '#fff' },
                });
                return null;
            }

            // ✅ Proceed to update
            await updateDoc(userDocRef, {
                'payslips.paySlip': arrayUnion(payslip),
            });

            const updatedSnapshot = await getDoc(userDocRef);
            const updatedData = updatedSnapshot.data();
            const updatedPayslips = updatedData?.payslips?.paySlip || [];

            store.dispatch(setPayslipData(updatedPayslips));

            toast.success(`Payslip for ${payslip.payPeriod.monthOfPay} updated successfully.`, {
                style: { background: '#4BB543', color: '#fff' },
            });

            return payslip;
        } catch (error: any) {
            toast.error(`Error updating payslip: ${error.message}`, {
                style: { background: '#ff4d4f', color: '#fff' },
            });
            return null;
        }
    }

    async updateStaffOnboardingDetails(partialDetails: Partial<StaffDetails>) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                toast.error("User not authenticated", {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return;
            }

            const userId = currentUser.uid;
            const staffDocRef = doc(db, "droidaccount", userId);
            const staffSnapshot = await getDoc(staffDocRef);

            if (!staffSnapshot.exists()) {
                toast.error("Staff record not found", {
                    style: { background: '#ff4d4f', color: '#fff' },
                });
                return;
            }

            const currentData = staffSnapshot.data();
            const updatedDetails = {
                ...currentData.staffDetails,
                ...partialDetails,
            };

            await updateDoc(staffDocRef, {
                'staff.staffDetails': updatedDetails,
            });

            // ✅ Update Redux state
            store.dispatch(setStaffDetails(updatedDetails));

            toast.success("Staff details updated successfully", {
                style: { background: '#4BB543', color: '#fff' },
            });

        } catch (error: any) {
            console.error("Error updating staff details:", error.message);
            toast.error("Failed to update staff details", {
                style: { background: '#ff4d4f', color: '#fff' },
            });
        }
    }






    // async fetchStaffForms(userId: string) {
    //     try {
    //         const userDocRef = doc(db, 'droidaccount', userId);
    //         const userSnapshot = await getDoc(userDocRef);

    //         if (userSnapshot.exists()) {
    //             const data = userSnapshot.data();
    //             const formsInfo = data?.forms || null;

    //             if (stafformsInfofInfo) {
    //                 console.log('Staff Info:', formsInfo);
    //                 return formsInfo;
    //             } else {
    //                 console.warn('No staff info found for user.');
    //                 return null;
    //             }
    //         } else {
    //             console.warn('No document found for user.');
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error fetching staff info:', error);
    //         return null;
    //     }
    // }
}

export const authService = new AuthService()