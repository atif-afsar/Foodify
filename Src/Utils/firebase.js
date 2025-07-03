// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBpfc1gmG1GuKyTmVf9XDkXlnvRZksemA",
    authDomain: "foodify-bc10e.firebaseapp.com",
    projectId: "foodify-bc10e",
    storageBucket: "foodify-bc10e.firebasestorage.app",
    messagingSenderId: "652067044384",
    appId: "1:652067044384:web:d86b5fd4cf5f6bca2c5045"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 