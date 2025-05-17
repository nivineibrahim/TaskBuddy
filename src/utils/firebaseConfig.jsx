import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCiDwV9cG6n69iNlapVpBiSQ-d-3y5-V6U",
  authDomain: "taskbuddy-e6416.firebaseapp.com",
  projectId: "taskbuddy-e6416",
  storageBucket: "taskbuddy-e6416.firebasestorage.app",
  messagingSenderId: "394142503214",
  appId: "1:394142503214:web:ee613feb3da376fe2beabf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const provider = new GoogleAuthProvider();