import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { useState, useEffect } from 'react';

export default function useFirebaseSnapshot() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    const q = token
      ? query(collection(db, 'shopping-list'), where('token', '==', token))
      : query(collection(db, 'shopping-list'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setDocs(items);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { docs, loading };
}
