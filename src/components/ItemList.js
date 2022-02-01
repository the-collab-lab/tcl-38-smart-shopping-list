import {
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase.js';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
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
      setDocs(items);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleChecked = async (id) => {
    const docRef = doc(db, 'shopping-list', id);
    await updateDoc(docRef, {
      'last purchased': serverTimestamp(),
    });
  };

  // const wasPurchasedToday = ("last purchased") => {
  // const oneDay = oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  //   return (oneDay - serverTimestamp())

  // }

  return (
    <>
      <h2>Smart Shopping List</h2>
      <ul>
        {docs.length > 0 ? (
          docs.map((item) => (
            <li key={item.id}>
              {/* {' '} */}
              <input
                type="checkbox"
                onChange={() => handleChecked(item.id)}
                checked={item.data['last purchased'] && true}
              />{' '}
              {item.data.name}
            </li>
          ))
        ) : (
          <p>
            No items yet! <Link to="/add-item">Add one.</Link>
          </p>
        )}
      </ul>
    </>
  );
};

export default ItemList;
