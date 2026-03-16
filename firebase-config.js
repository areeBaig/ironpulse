// ============================
// FIREBASE IMPORTS (v12.9.0)
// ============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


// ============================
// YOUR FIREBASE CONFIG
// ============================

const firebaseConfig = {
    apiKey: "AIzaSyAT3YL28Dsao1qmrdwk3WejaoaL8poElzI",
    authDomain: "ironpulse-fitness-1b42d.firebaseapp.com",
    projectId: "ironpulse-fitness-1b42d",
    storageBucket: "ironpulse-fitness-1b42d.firebasestorage.app",
    messagingSenderId: "762343713444",
    appId: "1:762343713444:web:965ad60972c5148ec01431"
};


// ============================
// INITIALIZE FIREBASE
// ============================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ============================
// GLOBAL USER STATE
// ============================

window.currentUser = null;


// ============================
// AUTH STATE LISTENER
// ============================

onAuthStateChanged(auth, (user) => {
    window.currentUser = user;

    if (user) {
        console.log("User logged in:", user.email);
    } else {
        console.log("User logged out");
    }
});


// ============================
// REGISTER FUNCTION
// ============================

window.registerUser = async function (email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful");
    } catch (error) {
        alert(error.message);
    }
};


// ============================
// LOGIN FUNCTION
// ============================

window.loginUser = async function (email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful");
    } catch (error) {
        alert(error.message);
    }
};


// ============================
// LOGOUT FUNCTION
// ============================

window.logoutUser = async function () {
    await signOut(auth);
    alert("Logged Out");
};


// ============================
// SAVE REPORT TO FIRESTORE
// ============================

window.saveReportToDatabase = async function (reportText) {

    if (!window.currentUser) return;

    const reportRef = doc(db, "reports", window.currentUser.uid);

    await setDoc(reportRef, {
        email: window.currentUser.email,
        report: reportText,
        createdAt: new Date()
    });

};