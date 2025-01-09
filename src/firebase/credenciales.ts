// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvXnAZ0_UIl8Q8Uzank61spCWR4VTLEz0",
  authDomain: "itsqmetapp.firebaseapp.com",
  projectId: "itsqmetapp",
  storageBucket: "itsqmetapp.firebasestorage.app",
  messagingSenderId: "1034853039422",
  appId: "1:1034853039422:web:8fda985c6567689329406f"
};
// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
export default app;