// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFQ1_AvCqkyowJQke_OMK1F3BnLvcTO8c",
  authDomain: "clase-vue-project.firebaseapp.com",
  databaseURL: "https://clase-vue-project-default-rtdb.firebaseio.com",
  projectId: "clase-vue-project",
  storageBucket: "clase-vue-project.firebasestorage.app",
  messagingSenderId: "1076862482191",
  appId: "1:1076862482191:web:4d7ca195224f59ecd9b07a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Realtime Database y exportar la instancia
export const db = getDatabase(app);