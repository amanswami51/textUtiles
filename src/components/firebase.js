import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG7V2WkmF11EMOl-d99ZCi1rCKAyFErqo",
  authDomain: "textutiles-af0f3.firebaseapp.com",
  databaseURL: "https://textutiles-af0f3-default-rtdb.firebaseio.com",
  projectId: "textutiles-af0f3",
  storageBucket: "textutiles-af0f3.appspot.com",
  messagingSenderId: "388810017939",
  appId: "1:388810017939:web:bc7a18de6518e48a029166",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFirestore = getFirestore(app);
const dbReal = getDatabase(app);

export {auth, dbFirestore, dbReal};