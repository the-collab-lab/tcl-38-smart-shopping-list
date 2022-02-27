// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyAb6TqW2T1qAdwoyF2jSRzcAIkRY5CB_YM',
  authDomain: 'temp-db-81402.firebaseapp.com',
  projectId: 'temp-db-81402',
  storageBucket: 'temp-db-81402.appspot.com',
  messagingSenderId: '732215859775',
  appId: '1:732215859775:web:3cb12b13ab2b693dbcf68a',
  measurementId: 'G-J80SXR6WVP',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
