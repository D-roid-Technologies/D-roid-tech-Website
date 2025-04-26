import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../../firebase";

const email = window.localStorage.getItem('emailForSignIn');
// if (isSignInWithEmailLink(auth, window.location.href)) {
//   signInWithEmailLink(auth, email, window.location.href)
//     .then((result) => {
//       // User successfully signed in
//       window.localStorage.removeItem('emailForSignIn');
//       console.log('Signed in successfully!');
//     })
//     .catch((error) => {
//       console.error("Error during email link sign-in:", error);
//     });
// }
