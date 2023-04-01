// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
  onSnapshot,
  deleteDoc,
  limit,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0s6dN3XbyrLUUItcWU2jxQjSmLaL-F7s",
  authDomain: "tanapa-d39fd.firebaseapp.com",
  projectId: "tanapa-d39fd",
  storageBucket: "tanapa-d39fd.appspot.com",
  messagingSenderId: "738825305960",
  appId: "1:738825305960:web:388092a885e5d5ff76a0dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if (!firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  db,
  Timestamp,
  setDoc,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
  onSnapshot,
  deleteDoc,
  limit,
  orderBy,
  getCountFromServer,
};
