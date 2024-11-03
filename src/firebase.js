// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmomYUTZXrUespDCIjPITwv1VQly_SgFQ",
  authDomain: "ecommerce-1df12.firebaseapp.com",
  projectId: "ecommerce-1df12",
  storageBucket: "ecommerce-1df12.firebasestorage.app",
  messagingSenderId: "807994178799",
  appId: "1:807994178799:web:86e87eb080e902fc572f1a",
  measurementId: "G-8K0VSX3D1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)