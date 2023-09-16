import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyDJAB8Q_2-e5ufkD7YHbCKXM_-9n7lT52I",
  authDomain: "blog-task-5d0c8.firebaseapp.com",
  projectId: "blog-task-5d0c8",
  storageBucket: "blog-task-5d0c8.appspot.com",
  messagingSenderId: "741948189702",
  appId: "1:741948189702:web:b89764adb487db76562787"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage: any = getStorage(app);
