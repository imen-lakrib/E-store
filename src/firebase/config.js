// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyCnF-WaMEiQVSUMm-HOftWpm-77_8qSQNo",
  authDomain: "e-store-523f0.firebaseapp.com",
  projectId: "e-store-523f0",
  storageBucket: "e-store-523f0.appspot.com",
  messagingSenderId: "191848587244",
  appId: "1:191848587244:web:e7b85ddcd945827814aac9",
  measurementId: "G-YYWHDDENVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db= getFirestore(app)
export const storage = getStorage(app)
export default app