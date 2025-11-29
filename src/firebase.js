// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT-JxNhj8GuHWnt9IAKXjPVfWpKfJ6auo",
  authDomain: "office-hour-queue-ccf68.firebaseapp.com",
  projectId: "office-hour-queue-ccf68",
  storageBucket: "office-hour-queue-ccf68.firebasestorage.app",
  messagingSenderId: "207671968614",
  appId: "1:207671968614:web:e6dc15cc9ec117e0897ea7",
  measurementId: "G-7MP1ZVFFCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);