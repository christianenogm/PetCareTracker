/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Firebase configuration and initialization for Firestore database connection.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Cloud Firestore
// import { getDatabase } from "firebase/database"; // Realtime Database  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlHiOtWYdkNu_5scPuD7WG1LOAhuAXlHM",
  authDomain: "majorproject-b64f4.firebaseapp.com",
  projectId: "majorproject-b64f4",
  storageBucket: "majorproject-b64f4.firebasestorage.app",
  messagingSenderId: "267769352973",
  appId: "1:267769352973:web:771aa6c71618192cc2d644"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };