import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);

export { app, db };
