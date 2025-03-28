// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ_G4sw2SXUINwLDoFLFMDaczAKUci7W8",
  authDomain: "habit-tracker-v1-d0abd.firebaseapp.com",
  projectId: "habit-tracker-v1-d0abd",
  storageBucket: "habit-tracker-v1-d0abd.firebasestorage.appspot.com",
  messagingSenderId: "101077910727",
  appId: "1:101077910727:web:7e703cb0bc84534c852ae2",
  measurementId: "G-PGSXFF4RJS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, app, analytics, auth, provider };
