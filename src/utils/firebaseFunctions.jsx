import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  collection,
  query,where,getDocs
} from "firebase/firestore";
import { auth, database } from "./firebaseConfig";
import React from "react";

export function getFrontendErrorMessage(errorCode) {
  switch (errorCode) {
    case "Firebase: Error (auth/user-not-found).":
      return "This email is not registered, please make sure you enter a registered email.";
    case "Firebase: Error (auth/wrong-password).":
      return "The password entered is wrong. Please make sure you enter the correct password.";
    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      return "The password should be at least 6 characters.";
    case "Firebase: Error (auth/email-already-in-use).":
      return "The email address is already in use. Please use a different email.";
    case "Firebase: Error (auth/invalid-email).":
      return "Invalid email address. Please enter a valid email.";
    case "Firebase: Error (auth/weak-password).":
      return "Weak password. Please choose a stronger password.";
    case "Firebase: Error (auth/invalid-login-credentials).":
      return "Incorrect credentials, please make sure you add correct ones.";
    case "Firebase: Error (auth/operation-not-allowed).":
      return "This operation is currently not allowed. Please try again later.";
    case "Firebase: Error (auth/too-many-requests).":
      return "Too many requests, please try again in some minutes";
    default:
      return "An error occurred. Please try again.";
  }
}

export const registerUser = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(database, "users", user.uid), {
      username: username,
      tasks: [],
      
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.meassage };
  }
};
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.meassage };
  }
};
/*export const fetchUserTasks = async (user) => {
  try {
    const docRef = doc(database, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: "No user document found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};*/

export const updateTasksArray = async (task) => {
  const user = auth.currentUser;

  const docRef = doc(database, "users", user.uid);

  try {
    await updateDoc(docRef, {
      tasks: arrayUnion(task),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.meassage };
  }
};

export const removeTask = async (task) => {
  const user = auth.currentUser;
  const taskRef = doc(database, "users", user.uid);
  try {
    await updateDoc(taskRef, {
      tasks: arrayRemove(task),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.meassage };
  }
};
