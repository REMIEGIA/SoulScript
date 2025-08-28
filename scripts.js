// scripts.js
// ------------------- Firebase Config -------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdm5p5IZQw3za8nOoSZguPBQAGheZRE_I",
  authDomain: "soulscript-becb3.firebaseapp.com",
  projectId: "soulscript-becb3",
  storageBucket: "soulscript-becb3.firebasestorage.app",
  messagingSenderId: "615706588661",
  appId: "1:615706588661:web:c2bd59d8254d610ce41cbc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ------------------- Helper Functions -------------------
function showMessage(elementId, message, isError = true) {
  let el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "red" : "green";
}

// ------------------- Registration -------------------
export function registerUser() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value.trim();

  if (!email || !password) {
    showMessage("regMsg", "Email and password cannot be empty.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // ✅ Sign out right after registration so user isn’t auto-logged in
      return signOut(auth);
    })
    .then(() => {
      alert("Registration successful! Please log in.");
      window.location.href = "index.html"; // redirect to login page
    })
    .catch(err => showMessage("regMsg", err.message));
}

// ------------------- Login -------------------
export function loginUser() {
  const email = document.getElementById("logEmail").value.trim();
  const password = document.getElementById("logPass").value.trim();

  if (!email || !password) {
    showMessage("logMsg", "Email and password cannot be empty.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "home.html")
    .catch(err => showMessage("logMsg", err.message));
}

// ------------------- Logout -------------------
export function logoutUser() {
  signOut(auth).then(() => {
     alert("Logged out!");
    window.location.href = "index.html";
  });
}

// ------------------- Auth State Listener -------------------
export function checkAuthRedirect(homePage = false) {
  onAuthStateChanged(auth, (user) => {
    if (homePage && !user) {
      // Not logged in, redirect to login page
      window.location.href = "index.html";
    } else if (!homePage && user) {
      // Already logged in, redirect to home page
      window.location.href = "home.html";
    }
  });
}




