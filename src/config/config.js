
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDQaXckng8FoDA67GIIjLBmyD0c6JYKMyg",
  authDomain: "alphbi1.firebaseapp.com",
  projectId: "alphbi1",
  storageBucket: "alphbi1.appspot.com",
  messagingSenderId: "630693873139",
  appId: "1:630693873139:web:b4de41d51f3de33ec5be86",
  measurementId: "G-7P2SY72DEJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)