import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from '@firebase/firestore';
import { db } from '../lib/firebase.js';

const FirebaseTest = () => {
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test-list'));

        const snapshotDocs = [];
        // loop through snapshot and push each doc to array
        querySnapshot.forEach((doc) => snapshotDocs.push(doc.data()));
        // set array into our ItemList state
        setItemList(snapshotDocs);
      } catch (error) {
        console.log(error.message);
      }
    };
    getItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemToAdd = { name: item, date: Date.now() };

    try {
      const docRef = await addDoc(collection(db, 'test-list'), itemToAdd);
      console.log(docRef.id + 'added to collection', itemToAdd);
      setItemList((prevItemList) => [...prevItemList, itemToAdd]);
      setItem('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">Item</label>
        <input
          type="text"
          value={item}
          onChange={({ target }) => setItem(target.value)}
        ></input>

        <button>Add Item</button>
      </form>

      <ul>
        {itemList &&
          itemList.map((item) => <li key={item.date}>{item.name}</li>)}
      </ul>
    </>
  );
};
export default FirebaseTest;
