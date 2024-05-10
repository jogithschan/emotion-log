import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4ofDxRzhITYGV-5sdwiSAOWsKac30PMM",
  authDomain: "companion-test-61124.firebaseapp.com",
  projectId: "companion-test-61124",
  storageBucket: "companion-test-61124.appspot.com",
  messagingSenderId: "217107141570",
  appId: "1:217107141570:web:44b827edc4876464c8fc5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };