import {
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  updateDoc,
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
        items.push(doc.data());
      });
      setDocs(items);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <h2>Smart Shopping List</h2>
      <ul>
        {docs.length > 0 ? (
          docs.map((item) => (
            <li key={item.token + item.name}>
              {' '}
              <input type="checkbox" /> {item.name}
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
