// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyD80TwU3W0l3G4-QNw76bLyIqLqquwulI4",
  authDomain: "win-biha.firebaseapp.com",
  projectId: "win-biha",
  storageBucket: "win-biha.appspot.com",
  messagingSenderId: "467406881853",
  appId: "1:467406881853:web:4f7604b885360e05989654",
  measurementId: "G-ST8C1GTF9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db= getFirestore(app)
export const storage = getStorage(app)
export default app