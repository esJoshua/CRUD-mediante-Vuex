// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE0b9Dcmj0I21Z4XVI_43RSiOzNMJTPDI",
  authDomain: "crud-vuex-5dd7b.firebaseapp.com",
  projectId: "crud-vuex-5dd7b",
  storageBucket: "crud-vuex-5dd7b.appspot.com",
  messagingSenderId: "605337253985",
  appId: "1:605337253985:web:5b410f1adb75ddcc265220",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
