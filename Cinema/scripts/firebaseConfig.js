  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBtfCx1RG31jRSDLA8rZwF3dVqMHGniDM0",
    authDomain: "cinemamalithi.firebaseapp.com",
    projectId: "cinemamalithi",
    storageBucket: "cinemamalithi.appspot.com",
    messagingSenderId: "1053063020385",
    appId: "1:1053063020385:web:cd2248e49389e3e0ab0f20"
  };

  // Initialize Firebase
// Initialisation de Firebase avec la configuration
const app = initializeApp(firebaseConfig);

// Récupérer une référence à Firestore
const db = getFirestore(app);

export { app, db }; // Exporter l'application et la référence à Firestore


//Script que j'ai eu à copié de google firestore database quand j'ai généré mon projet pour avoir ma base de données