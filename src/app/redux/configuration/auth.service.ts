import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../../firebase";
import { LocationState, UserType } from "../../utils/Types";
import { logoutUser, setUser } from "../slices/User";
import { store } from "../Store";


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
                        // All other optional values omitted for cleaner write
                    },
                    location: {
                        locationFromDevice: locationData,
                        currentdateTime: currentDateTime,
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
                    staff: {},
                    toolBox: {},
                    muzik: {},
                    calculate: {},
                    schedules: {},
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
}

export const authService = new AuthService()