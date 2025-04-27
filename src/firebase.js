
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, sendPasswordResetEmail, updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCxSBa3szWJQq4XTljacDXNyV_fEcW5Ui4",
  authDomain: "d-roid-technologies.firebaseapp.com",
  projectId: "d-roid-technologies",
  storageBucket: "d-roid-technologies.firebasestorage.app",
  messagingSenderId: "1097060758359",
  appId: "1:1097060758359:web:c55593be543e1a68260412",
  measurementId: "G-P85PQM3KWH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db }