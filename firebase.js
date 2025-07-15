// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyF2VyiIK1DbZE29AdzkLYCSU4HB1z9qw",
  authDomain: "form-project-da2d8.firebaseapp.com",
  projectId: "form-project-da2d8",
  storageBucket: "form-project-da2d8.firebasestorage.app",
  messagingSenderId: "864862750726",
  appId: "1:864862750726:web:5e9ed7379e633df5e0db87"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
