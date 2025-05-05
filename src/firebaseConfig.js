// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  EmailAuthProvider,
  fetchSignInMethodsForEmail
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCojQPg0HfYo9p04YHEnr3bnj_1undHTjY",
  authDomain: "godproyecto-fbc8b.firebaseapp.com",
  projectId: "godproyecto-fbc8b",
  storageBucket: "godproyecto-fbc8b.firebasestorage.app",
  messagingSenderId: "121273785965",
  appId: "1:121273785965:web:a0241f5cb695092ca4a964",
  measurementId: "G-N7NEF9NEN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and export instances
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure provider to always show account picker
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { 
  auth, 
  googleProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider
};

