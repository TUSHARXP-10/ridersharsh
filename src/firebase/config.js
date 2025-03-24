import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDcjm4Vm-o2nOFcoBjkIlCor6cqof5u-R8",
  authDomain: "ridders-adda.firebaseapp.com",
  projectId: "ridders-adda",
  storageBucket: "ridders-adda.firebasestorage.app",
  messagingSenderId: "142318090299",
  appId: "1:142318090299:web:0633fcbe06fe5783a4441e",
  measurementId: "G-PK446E3M45"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);