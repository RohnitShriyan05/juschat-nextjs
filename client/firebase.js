import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAl7suW8GagW1GiCRDtr7PC8SqDBObNfX8",

  authDomain: "justchat-6018b.firebaseapp.com",

  databaseURL:
    "https://justchat-6018b-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "justchat-6018b",

  storageBucket: "justchat-6018b.appspot.com",

  messagingSenderId: "534529031380",

  appId: "1:534529031380:web:0ceae5728d8df644288f41",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();



