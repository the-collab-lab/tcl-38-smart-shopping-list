import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
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

      {successMessage && <p>{successMessage}</p>}
    </>
  );
};

export default AddItem;
