import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAu_c8V0hknhffEo3r0Rn6xzGgwNQgJR1s",
  authDomain: "my-post-e7b9f.firebaseapp.com",
  projectId: "my-post-e7b9f",
  storageBucket: "my-post-e7b9f.appspot.com",
  messagingSenderId: "178226797599",
  appId: "1:178226797599:web:56d3cea2ca0039d609892a",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const dataBase = getFirestore(app);
export const auth = getAuth(app);
