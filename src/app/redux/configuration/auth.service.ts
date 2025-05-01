import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { LocationState, UserType } from "../../utils/Types";
import { setUser } from "../slices/User";
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
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password).then(async (res) => {
            // 2. Send email verification
            const currentDateTime = getCurrentDateTime();
            const user = res.user;
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
                        middleName: "",
                        initials: `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
                        userType: userData.userType,
                        uniqueId: userData.uniqueId,
                        email: userData.email,
                        phone: "",
                        agreeToPolicy: userData.agreeToPolicy,
                        isLoggedIn: true,
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
                        agreedToTerms: true,
                        twoFactorSettings: false,
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
                                numberOfAdsWatched: 0
                            }
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
                            }
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
                                }
                            ],
                            jobs: [
                                {
                                    jobTitle: "Front-End Developer - React Js",
                                    description: "We are looking for a front end developer in Recat Js",
                                    imageLink: "",
                                    peopleApplied: 0,
                                    createdTime: currentDateTime.time,
                                    createdDate: `${currentDateTime.date}-${currentDateTime.month}-${currentDateTime.year}`,
                                }
                            ]
                        }
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
                const primaryInformation = fetchedUserData.user.primaryInformation
                store.dispatch(setUser({ ...primaryInformation, role: fetchedUserData.user.primaryInformation.role }));
                // principalSubdivision
            } else {
                alert("User Information does not exist");
            }
        }).catch((error) => {
            console.error(`Error creating your D'roid Account:`, error.message);
        })

        return userCredential
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

    async handleUserLogin(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password).then(async (res) => {
            const userDocRef = doc(collection(db, "droidaccount"), res.user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const fetchedUserData = userDocSnap.data();
                const primaryInformation = fetchedUserData.user.primaryInformation
                store.dispatch(setUser({ ...primaryInformation, role: fetchedUserData.user.primaryInformation.role }))
            } else {
                alert("User Information does not exist");
            }
        }).catch((err) => {
            console.log(err.message);
            alert(err.message);
        })
        return userCredential
    }
}

export const authService = new AuthService()