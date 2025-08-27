// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
