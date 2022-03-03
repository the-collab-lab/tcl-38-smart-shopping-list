// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyArP4G18A1NSWOOjRfurnMpAFdgav-ea84',
  authDomain: 'tcl-38-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-38-smart-shopping-list',
  storageBucket: 'tcl-38-smart-shopping-list.appspot.com',
  messagingSenderId: '899088164997',
  appId: '1:899088164997:web:d84357d7df8a7b5a4be1ec',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
