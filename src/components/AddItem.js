import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase.js';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [message, setMessage] = useState('');
  const frequencyOptions = [
    {
      id: 'soon',
      value: 7,
      message: 'Soon',
    },

    {
      id: 'kind-of-soon',
      value: 14,
      message: 'Kind of Soon',
    },

    {
      id: 'not-soon',
      value: 30,
      message: 'Not Soon',
    },
  ];

  const [buyAgainTime, setBuyAgainTime] = useState(frequencyOptions[0].value);

  const itemToAdd = {
    name: itemName,
    'last purchased': null,
    'next purchase': Number(buyAgainTime),
    token: localStorage.getItem('token'),
  };

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

  const nameArray = docs.map((doc) => {
    return doc.name
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g, '')
      .toLowerCase()
      .trim();
  });
  console.log(nameArray);
  let cleanItemName = itemName
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@]/g, '')
    .toLowerCase()
    .trim();
  console.log(cleanItemName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nameArray.includes(cleanItemName)) {
        throw new Error('item is included!');
      }

      const docRef = await addDoc(collection(db, 'shopping-list'), itemToAdd);
      console.log(docRef.id);
      setMessage(`Hurray! ${itemName} was added to the list.`);
      setItemName('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <h2>Smart Shopping List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item-name">Item Name</label>
        <input
          required
          id="item-name"
          type="text"
          name="item-name"
          value={itemName}
          onChange={({ target }) => setItemName(target.value)}
        />
        <fieldset>
          <legend>How soon will you buy this again?</legend>

          {frequencyOptions.map(({ id, value, message }, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  id={id}
                  name="buyAgain"
                  value={value}
                  defaultChecked={!index}
                  onChange={({ target }) => setBuyAgainTime(target.value)}
                />
                <label htmlFor={id}>{message}</label>
              </div>
            );
          })}
        </fieldset>

        <button type="submit">Add Item</button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
};

export default AddItem;
