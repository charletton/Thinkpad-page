import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionRef = collection(db, 'usuarios');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App collectionRef={collectionRef} />
  </React.StrictMode>,
);
