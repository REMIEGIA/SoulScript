// 🔹 Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyDdm5p5IZQw3za8nOoSZguPBQAGheZRE_I",
  authDomain: "soulscript-becb3.firebaseapp.com",
  projectId: "soulscript-becb3",
  storageBucket: "soulscript-becb3.appspot.com",
  messagingSenderId: "615706588661",
  appId: "1:615706588661:web:c2bd59d8254d610ce41cbc"
};

// 🔹 Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { firebaseConfig } from './scripts.js'; // import your config

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// --- Login Page Functions --- 
export function registerUser() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Registration successful! You can now log in."))
    .catch(err => alert(err.message));
}

export function loginUser() {
  const email = document.getElementById("logEmail").value;
  const password = document.getElementById("logPass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "home.html")
    .catch(err => alert(err.message));
}

// --- Home Page Functions --- 
export function logoutUser() {
  signOut(auth).then(() => window.location.href = "index.html");
}

// --- Auth State Listener --- 
export function checkAuthRedirect(homePage = false) {
  onAuthStateChanged(auth, (user) => {
    if (homePage && !user) {
      // Redirect to login if on home page but not logged in
      window.location.href = "index.html";
    } else if (!homePage && user) {
      // Redirect to home if on login page and already logged in
      window.location.href = "home.html";
    }
  });
}
