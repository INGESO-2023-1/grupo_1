// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkah8D88kfWfGcY1s7f3XvvOWEtDR-FOA",
  authDomain: "mensajeria-sansana.firebaseapp.com",
  projectId: "mensajeria-sansana",
  storageBucket: "mensajeria-sansana.appspot.com",
  messagingSenderId: "806409899104",
  appId: "1:806409899104:web:785eab70f5e489cd26c705",
  measurementId: "G-NXGXX5DQP7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();