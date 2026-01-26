import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACoorvOwun0e2C626F38owne4T-i2sLyY",
    authDomain: "login-756bc.firebaseapp.com",
    projectId: "login-756bc",
    storageBucket: "login-756bc.firebasestorage.app",
    messagingSenderId: "63297176270",
    appId: "1:63297176270:web:477a2b6ed6d569a880c69f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export everything
export { 
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
};