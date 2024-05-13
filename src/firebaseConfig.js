// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUA8kQKGV85XUChJTBoR4zhsnWWEOg0NE",
  authDomain: "fennrent.firebaseapp.com",
  projectId: "fennrent",
  storageBucket: "fennrent.appspot.com",
  messagingSenderId: "200868383071",
  appId: "1:200868383071:web:a2a429dc7127ebb1bc0eea",
  measurementId: "G-E5SG9FSDTX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// const analytics = getAnalytics(app);