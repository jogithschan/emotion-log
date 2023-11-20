// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
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
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };