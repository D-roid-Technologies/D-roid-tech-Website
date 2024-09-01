
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCJ4LA1yvGvOtrYx9hoNORs2jwz0cg4YCk",
  authDomain: "thedroidapp-48184.firebaseapp.com",
  projectId: "thedroidapp-48184",
  storageBucket: "thedroidapp-48184.appspot.com",
  messagingSenderId: "511192583775",
  appId: "1:511192583775:web:a33aced97c3b26aa9e15ea",
  measurementId: "G-7Q9HH4E58X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);