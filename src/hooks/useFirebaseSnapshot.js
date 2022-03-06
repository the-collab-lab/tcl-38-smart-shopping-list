import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { useState, useEffect } from 'react';
import itemStatus from '../utils/itemStatus.js';
import { useToken } from '../context/TokenContext.js';

export default function useFirebaseSnapshot() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState('');
  const { hasToken } = useToken();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    const q = query(
      collection(db, 'shopping-list'),
      where('token', '==', token),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ data: doc.data(), id: doc.id });
      });
      //sort items
      items.sort((item1, item2) => {
        let sortNum1, sortNum2;

        //check to see which data we are using for sorting based on purchase history
        //sort using next purchase data if < 1 purchases, sort using estimated purchase interval if 1 or more purchases
        !item1.data['total purchases']
          ? (sortNum1 = item1.data['next purchase'])
          : (sortNum1 = item1.data['estimated purchase interval']);

        //check for inactives
        if (itemStatus(item1) === 'inactive') sortNum1 = 1000;

        !item2.data['total purchases']
          ? (sortNum2 = item2.data['next purchase'])
          : (sortNum2 = item2.data['estimated purchase interval']);

        //check for inactives
        if (itemStatus(item2) === 'inactive') sortNum2 = 1000;

        return (
          //sort with sort nums, or if nums equal, sort based on alphabetical order of item name
          sortNum1 - sortNum2 || item1.data.name.localeCompare(item2.data.name)
        );
      });
      setDocs(items);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [hasToken]);

  return { docs, loading };
}
