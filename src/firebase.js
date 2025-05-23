// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ5C8yjwC84gn_-AXqdb13BXoheiN_6tM",
  authDomain: "project-cost-tracker-5c250.firebaseapp.com",
  projectId: "project-cost-tracker-5c250",
  storageBucket: "project-cost-tracker-5c250.firebasestorage.app",
  messagingSenderId: "853874021063",
  appId: "1:853874021063:web:391a3a1b2e7084358fa4e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
