// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBaGWsWSo_BXVbSwlbs86cMLU2_Kj7SrE",
  authDomain: "user-email-password-auth-1592d.firebaseapp.com",
  projectId: "user-email-password-auth-1592d",
  storageBucket: "user-email-password-auth-1592d.appspot.com",
  messagingSenderId: "847051219154",
  appId: "1:847051219154:web:3baefc13a6afc985d10d0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth