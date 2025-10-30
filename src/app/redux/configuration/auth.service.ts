import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, query, where, getDocs, arrayRemove } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../../firebase";
import { LocationState, Task, UserType } from "../../utils/Types";
import { setKnowledgeCity } from "../slices/knowledgeCity";
import { setNotifications } from "../slices/notificationSlice";
import { PaySlip, setPayslipData } from "../slices/paySlipSlice";
import { setAllMilestones } from "../slices/ProgressionSlice";
import { addTask, deleteAllTasks, deleteThisTask, TaskMain } from "../slices/scheduleTask";
import { setSignInAndOutData, setStaffDetails, setStaffDocuments, setStaffLeave, StaffDetails } from "../slices/SignInAndOutSlice";
import { setTrainings } from "../slices/TrainingsSlice";
import { setCalculate, setSchedules, setToolBox } from "../slices/TSCSlice";
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

function removeUndefined(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(removeUndefined);
    } else if (obj && typeof obj === 'object') {
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

    async handleUserRegistration(userData: UserType, locationData: LocationState) {
        try {
            const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
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
                        initials: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
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
                        country: ""
                    },
                    location: {
                        locationFromDevice: locationData,
                        currentdateTime: currentDateTime,
                    },
                    userForms: [],
                    knowledgeCity: {
                        kCoin: {
                            amount: 0,
                            storeCardDetails: false,
                            mineCoins: {
                                numberOfReferals: 0,
                                numberOfAdsWatched: 0,
                            },
                        },
                        courses: [],
                        notifications: [],
                        schedules: [],
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
                    notifications: [],
                    paySlip: [],
                    onboard: {
                        onboarding: [],
                        memberStatus: []
                    },
                    trainings: [],
                    progressions: [],
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
                },
                toolBox: {
                    toolBoxInfo: []
                },
                calculate: {
                    calculators: []
                },
                schedules: {
                    mySchedles: []
                },

            };

            await setDoc(userDocRef, droidAccount);
            const userSnapshot = await getDoc(userDocRef);

            if (userSnapshot.exists()) {
                const fetchedUserData = userSnapshot.data();
                const primaryInformation = fetchedUserData.user.primaryInformation;

                store.dispatch(setUser({ ...primaryInformation }));

                await sendEmailVerification(user);
                await signOut(auth); // Prevent implicit navigation
 
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
    };

    // async handleGoogleSignin() {
    //     const currentDateTime = getCurrentDateTime();
    //     const signInData = signInWithPopup(auth, provider)
    //         .then(
    //             async (res: {
    //                 user: {
    //                     refreshToken: string;
    //                     providerData: { photoURL: any }[];
    //                     uid: any;
    //                 };
    //             }) => {
    //                 const providerData = res.user.providerData[0] as FirebaseProviderData;
    //                 const userDocRef = doc(collection(db, "nerveaccount"), res.user.uid);
    //                 const gottenNames: string[] = splitFullNameBySpace(
    //                     providerData.displayName
    //                 );
    //                 const allInitials: string[] = getFirstInitials(gottenNames);
    //                 const nerveAccount = {
    //                     user: {
    //                         primaryInformation: {
    //                             firstName: capitalizeFirstLetter(gottenNames[0]),
    //                             lastName: capitalizeFirstLetter(gottenNames[1]),
    //                             middleName: "",
    //                             email: providerData.email,
    //                             phone: "",
    //                             userType: "Buyer",
    //                             nameInitials: `${allInitials[0].toUpperCase()}${allInitials[1].toUpperCase()}`,
    //                             uniqueIdentifier: res.user.uid,
    //                             gender: "",
    //                             dateOfBirth: "",
    //                             photoUrl: providerData.photoURL,
    //                             isLoggedIn: true,
    //                             agreedToTerms: true,
    //                             verifiedEmail: false,
    //                             verifyPhoneNumber: false,
    //                             twoFactorSettings: false,
    //                             referralName: "",
    //                             secondaryEmail: "",
    //                             securityQuestion: "",
    //                             securityAnswer: "",
    //                             disability: false,
    //                             disabilityType: "",
    //                             educationalLevel: "",
    //                             dateOfCreation: currentDateTime,
    //                         },
    //                         location: {
    //                             streetNumber: "",
    //                             streetName: "",
    //                             city: "",
    //                             state: "",
    //                             country: "",
    //                             postalCode: "",
    //                             geoCoordinates: {
    //                                 latitude: "",
    //                                 longitude: "",
    //                             },
    //                         },
    //                     },
    //                     cart: [] as Cart[],
    //                     notifications: [] as Notification[],
    //                     orders: [] as OrderInter[],
    //                     reviews: [] as ReviewInter[],
    //                     myItems: [] as MyItems[],
    //                     friends: [] as Friends[],
    //                     wallet: {} as Wallet,
    //                 };
    //                 await setDoc(userDocRef, nerveAccount);
    //                 const userSnapshot = await getDoc(userDocRef);
    //                 if (userSnapshot.exists()) {
    //                     const fetchedUserData = userSnapshot.data();
    //                     const primaryInformation = fetchedUserData.user.primaryInformation;

    //                     store.dispatch(
    //                         setUser({
    //                             providerId: providerData.providerId || "",
    //                             uid: providerData.uid || "",
    //                             primaryInformation: {
    //                                 firstName: capitalizeFirstLetter(gottenNames[0] || ""),
    //                                 lastName: capitalizeFirstLetter(gottenNames[1] || ""),
    //                                 middleName: "",
    //                                 email: providerData.email || "",
    //                                 phone: providerData.phoneNumber || "",
    //                                 userType: "both",
    //                                 nameInitials: `${(gottenNames[0]?.[0] || "").toUpperCase()}${(
    //                                     gottenNames[1]?.[0] || ""
    //                                 ).toUpperCase()}`,
    //                                 uniqueIdentifier: providerData.uid || "",
    //                                 gender: "",
    //                                 dateOfBirth: "",
    //                                 photoUrl: providerData.photoURL || "",
    //                                 isLoggedIn: true,
    //                                 agreedToTerms: true,
    //                                 verifiedEmail: false,
    //                                 verifyPhoneNumber: false,
    //                                 twoFactorSettings: false,
    //                                 referralName: "",
    //                                 secondaryEmail: "",
    //                                 securityQuestion: "",
    //                                 securityAnswer: "",
    //                                 disability: false,
    //                                 disabilityType: "",
    //                                 educationalLevel: "",
    //                                 dateOfCreation: getCurrentDateTime(),
    //                             },
    //                             location: {
    //                                 streetNumber: "",
    //                                 streetName: "",
    //                                 city: "",
    //                                 state: "",
    //                                 country: "",
    //                                 postalCode: "",
    //                                 geoCoordinates: {
    //                                     latitude: "",
    //                                     longitude: "",
    //                                 },
    //                             },
    //                         })
    //                     );

    //                     toast.success(`Welcome to Nerves ${primaryInformation.firstName}`, {
    //                         style: { background: "#4BB543", color: "#fff" },
    //                     });

    //                     return { success: true };
    //                 } else {
    //                     toast.error("User Information does not exist 🚫", {
    //                         style: { background: "#ff4d4f", color: "#fff" },
    //                     });
    //                     return null;
    //                 }
    //             }
    //         )
    //         .catch((err) => {
    //             console.error("Error during registration:", err);
    //             toast.error(`Error creating your Account 🚫`, {
    //                 style: { background: "#ff4d4f", color: "#fff" },
    //             });
    //             return null;
    //         });
    //     return signInData;
    // }

    async getAllUsersFromFirestore() {
        try {
            const user = auth.currentUser;
            console.log(user)
        } catch (error: any) {
            console.error("Error fetching users:", error.message);
        }
    }

    async handleUserLogin(email: string, password: string, isStaff: boolean) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(collection(db, "droidaccount"), userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const updatedData = userDocSnap.data();
            // console.log(updatedData)

            if (userDocSnap.exists()) {
                const fetchedUserData = userDocSnap.data();
                const primaryInformation = fetchedUserData.user?.primaryInformation;
                const userForm = fetchedUserData.user?.userForms;
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

                const updatedEntries = updatedData?.user?.staff?.staffSignInAndOut || [];
                const updatedStaffDetails = {
                    staffGrossPay: updatedData?.user?.staff?.staffDetails?.staffGrossPay || "",
                    staffTax: updatedData?.user?.staff?.staffDetails?.staffTax || "",
                    staffPosition: updatedData?.user?.staff?.staffDetails?.staffPosition || "",
                    staffBank: updatedData?.user?.staff?.staffDetails?.staffBank || "",
                    staffAccountNmber: updatedData?.user?.staff?.staffDetails?.staffAccountNmber || "",
                    staffAccountName: updatedData?.user?.staff?.staffDetails?.staffAccountName || "",
                };
                const updatedStaffDocuments = updatedData?.user?.staff?.staffDoc || {};
                const updatedStaffLeave = updatedData?.user?.staff?.staffLeave || [];
                const updatedKnowledgeCity = updatedData?.user?.knowledgeCity || {};
                const updatedNotifications = updatedData?.user?.notifications || [];
                const updatedOnboarding = updatedData?.user?.onboard?.onboarding || [];
                const updatedMemberStatus = updatedData?.user?.onboard?.memberStatus || [];
                const updatedTrainings = updatedData?.user?.trainings || [];
                const updatedPayslips = updatedData?.user?.payslips?.paySlip || [];
                const updatedProgressions = updatedData?.user?.progressions || [];
                const schedleData = updatedData?.schedules?.mySchedules || [];
                const toolBoxData = updatedData?.toolBox?.toolBoxInfo || [];
                const calculateData = updatedData?.calculate?.calculators || [];
                // console.log("line 577", schedleData)
                // Store and proceed
                store.dispatch(setPayslipData(updatedPayslips));
                store.dispatch(setKnowledgeCity(updatedKnowledgeCity));
                // Note: Onboarding data now managed by onboarding slice internally
                store.dispatch(setTrainings(updatedTrainings));
                store.dispatch(setNotifications(updatedNotifications));
                store.dispatch(setAllMilestones(updatedProgressions));
                store.dispatch(setSignInAndOutData(updatedEntries));
                store.dispatch(setStaffDetails(updatedStaffDetails));
                store.dispatch(setStaffDocuments(updatedStaffDocuments));
                store.dispatch(setToolBox(toolBoxData));
                store.dispatch(setCalculate(calculateData));
                store.dispatch(setSchedules(schedleData));
                store.dispatch(setStaffLeave(updatedStaffLeave));
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

                //use below  to test and download slip if it shows Payslip for the  already exists.
                // (item: PaySlip) => item.payPeriod.monthOfPay !== payslip.payPeriod.monthOfPay
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
            console.log(auth.currentUser); // ✅ for debugging

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

            await updateDoc(staffDocRef, {
                "staff.staffDetails": updatedDetails,
            });

            store.dispatch(setStaffDetails(updatedDetails));

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

    async handleCreateTask(task: Task) {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("No authenticated user");

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);

            // Clean task
            const cleanedTask = removeUndefined(task);

            // Just push it
            await updateDoc(userDocRef, {
                "schedules.mySchedles": arrayUnion(cleanedTask),
            });

            // Update Redux optimistically (no re-fetch)
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

            // Normalize each task
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

            // Fetch the current tasks
            const userSnapshot = await getDoc(userDocRef);
            if (!userSnapshot.exists()) throw new Error("User document not found");

            const tasks: Task[] = userSnapshot.data()?.schedules?.mySchedles || [];
            // console.log(tasks)

            // Find the task to delete
            const taskToDelete = tasks.find((t) => t.id === taskId);
            if (!taskToDelete) {
                toast.error("Task not found", {
                    style: { background: "#faad14", color: "#fff" },
                });
                return null;
            }

            // Remove the task from Firestore
            await updateDoc(userDocRef, {
                "schedules.mySchedles": arrayRemove(taskToDelete),
            });

            // Update Redux store optimistically
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

            const tasks: TaskMain[] = userSnapshot.data()?.schedules?.mySchedles ?? [];

            // Replace the task with the updated one
            const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));

            await updateDoc(userDocRef, { "schedules.mySchedles": updatedTasks });

            // Update Redux optimistically
            store.dispatch(deleteThisTask(updatedTask.id));
            store.dispatch(addTask(updatedTask));

            return updatedTask;
        } catch (error: any) {
            throw new Error(error.message || "Failed to update task");
        }
    }


}

export const authService = new AuthService()