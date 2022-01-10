import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { collection, addDoc, getDocs } from '@firebase/firestore';
import { db } from '../lib/firebase.js';

const FirebaseTest = () => {
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    const getItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test-list'));

        const snapshotDocs = [];
        // loop through snapshot and push each item to array
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

    try {
      const docRef = await addDoc(collection(db, 'test-list'), {
        name: item,
        date: Date.now(),
      });
      console.log(docRef.id + 'added to collection', docRef);
      // history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log('itemList', itemList);
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
