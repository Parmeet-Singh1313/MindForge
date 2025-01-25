// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-course-generator-107db.firebaseapp.com",
    projectId: "ai-course-generator-107db",
    storageBucket: "ai-course-generator-107db.firebasestorage.app",
    messagingSenderId: "556226895223",
    appId: "1:556226895223:web:4fbc7fc338d0b8b8735572",
    measurementId: "G-8WM8MFNPFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);