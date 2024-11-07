// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment = {
    production: false,
    firebase: {
      apiKey: "AIzaSyDhTd85C9rWm2GT541WILtE02fju33W8I4",
      authDomain: "tpangular-86004.firebaseapp.com",
      projectId: "tpangular-86004",
      storageBucket: "tpangular-86004.firebasestorage.app",
      messagingSenderId: "1067203427339",
      appId: "1:1067203427339:web:0594caecb768916b9a1b0e"
    }
  };

// Initialize Firebase
const app = initializeApp(environment.firebase);
// const db = getFirestore(app);