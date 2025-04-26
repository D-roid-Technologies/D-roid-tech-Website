import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../../firebase";

// Send a sign-in link to the user's email
const email = "seniordevekene@gmail.com";
const actionCodeSettings = {
    // Redirect back to your app
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    handleCodeInApp: true,
};

// Send email link for sign-in
sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        // Save the email locally to complete sign-in
        window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
        console.error("Error sending email link:", error);
    });

