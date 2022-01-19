import { addDoc, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase.js';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [buyAgainTime, setBuyAgainTime] = useState(7);
  const [successMessage, setSuccessMessage] = useState('');

  const itemToAdd = {
    name: itemName,
    'last purchased': null,
    'next purchase': Number(buyAgainTime),
    token: localStorage.getItem('token'),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'shopping-list'), itemToAdd);
      console.log(docRef.id);
      setSuccessMessage(`Hurray! ${itemName} was added to the list.`);
      setItemName('');
    } catch (error) {
      console.log(error.message);
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
          <input
            type="radio"
            id="soon"
            name="buyAgain"
            value={7}
            defaultChecked
            onChange={({ target }) => setBuyAgainTime(target.value)}
          />
          <label htmlFor="soon">Soon</label>

          <input
            type="radio"
            id="kind-of-soon"
            name="buyAgain"
            value={14}
            onChange={({ target }) => setBuyAgainTime(target.value)}
          />
          <label htmlFor="kind-of-soon">Kind of Soon</label>

          <input
            type="radio"
            id="not-soon"
            name="buyAgain"
            value={30}
            onChange={({ target }) => setBuyAgainTime(target.value)}
          />
          <label htmlFor="not-soon">Not Soon</label>
        </fieldset>

        <button type="submit">Add Item</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </>
  );
};

export default AddItem;
