import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFfWhaJn0x4BkxTh0mF9XNUrZMSJfb970",
    authDomain: "coding-platform-51fff.firebaseapp.com",
    projectId: "coding-platform-51fff",
    storageBucket: "coding-platform-51fff.appspot.com",
    messagingSenderId: "17410008389",
    appId: "1:17410008389:web:f202c9c3fef6453a1dca2c",
    measurementId: "G-7PN6WQRQXH"
  };
 

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;