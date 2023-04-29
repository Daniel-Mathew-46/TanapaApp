// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

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
  // apiKey: "AIzaSyC0s6dN3XbyrLUUItcWU2jxQjSmLaL-F7s",
  // authDomain: "tanapa-d39fd.firebaseapp.com",
  // projectId: "tanapa-d39fd",
  // storageBucket: "tanapa-d39fd.appspot.com",
  // messagingSenderId: "738825305960",
  // appId: "1:738825305960:web:388092a885e5d5ff76a0dd",

  apiKey: "AIzaSyB2VxaIfF4bSzZIynJzJ-z-f5P5x-e0PBo",
  authDomain: "projecttanapa.firebaseapp.com",
  projectId: "projecttanapa",
  storageBucket: "projecttanapa.appspot.com",
  messagingSenderId: "887461835098",
  appId: "1:887461835098:web:5761692bf292cfb2ce8363",
  measurementId: "G-GE5MB64773"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if (!firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }
// const analytics = getAnalytics(app);

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

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB2VxaIfF4bSzZIynJzJ-z-f5P5x-e0PBo",
//   authDomain: "projecttanapa.firebaseapp.com",
//   projectId: "projecttanapa",
//   storageBucket: "projecttanapa.appspot.com",
//   messagingSenderId: "887461835098",
//   appId: "1:887461835098:web:5761692bf292cfb2ce8363",
//   measurementId: "G-GE5MB64773"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
