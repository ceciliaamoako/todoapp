import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVVdripCdxg9j54cCOeGkJln0ls-D2Jr0",
  authDomain: "todoapp-64a4e.firebaseapp.com",
  projectId: "todoapp-64a4e",
  storageBucket: "todoapp-64a4e.appspot.com",
  messagingSenderId: "497718629587",
  appId: "1:497718629587:web:6795925883444437c9b026",
  measurementId: "G-YC92VSM6QC",
});
const db = firebaseApp.firestore();

export default db;
