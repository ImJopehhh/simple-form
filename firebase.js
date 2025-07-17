const firebaseConfig = {
  apiKey: "AIzaSyDyF2VyiIK1DbZE29AdzkLYCSU4HB1z9qw",
  authDomain: "form-project-da2d8.firebaseapp.com",
  projectId: "form-project-da2d8",
  storageBucket: "form-project-da2d8.appspot.com",
  messagingSenderId: "864862750726",
  appId: "1:864862750726:web:5e9ed7379e633df5e0db87"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
