import { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../lib/firebase.js';

const ItemList = () => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lars-test-token'));

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

  return (
    <>
      <h1>Shopping List</h1>
      <ul>
        {itemList &&
          itemList.map((item) => <li key={item.name}>{item.name}</li>)}
      </ul>
    </>
  );
};

export default ItemList;
