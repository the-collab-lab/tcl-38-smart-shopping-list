import React, { useState } from 'react';
import { collection, addDoc } from '@firebase/firestore';
import { db } from '../lib/firebase.js';

const AddItem = () => {
  const [orderHowSoon, setOrderHowSoon] = useState('soon');
  const [itemName, setItemName] = useState('');

  const handleSoonChange = (e) => {
    setOrderHowSoon(e.target.value);
  };

  const getDaysUntilNextPurcase = (howSoon) => {
    switch (howSoon) {
      case 'soon':
        return 7;
      case 'kind-of-soon':
        return 14;
      case 'not-soon':
        return 30;
      default:
        return -1;
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    const token = 'lars-test-token';

    const itemToAdd = {
      name: itemName,
      daysUntilNextPurchase: getDaysUntilNextPurcase(orderHowSoon),
      lastPurcaseDate: null,
    };

    try {
      await addDoc(collection(db, token), itemToAdd);
      alert('Item added!');
      setItemName('');
      setOrderHowSoon('soon');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Add Item</h1>
      <form>
        <div>
          <label htmlFor="item-name">
            Item name:
            <input
              type="text"
              name="item-name"
              id="item-name"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
            />
          </label>
          <fieldset>
            <legend>How soon will you buy this again?</legend>

            <label htmlFor="soon" id="labelSoon">
              Soon
              <input
                type="radio"
                name="how-soon"
                id="soon"
                value="soon"
                checked={orderHowSoon === 'soon'}
                onChange={(event) => handleSoonChange(event)}
              />
            </label>
            <br />

            <label htmlFor="kind-of-soon" id="labelKindOfSoon">
              Kind of Soon
              <input
                type="radio"
                name="how-soon"
                id="kind-of-soon"
                value="kind-of-soon"
                checked={orderHowSoon === 'kind-of-soon'}
                onChange={(event) => handleSoonChange(event)}
              />
            </label>
            <br />

            <label htmlFor="not-soon" id="labelNotSoon">
              Not Soon
              <input
                type="radio"
                name="how-soon"
                id="not-soon"
                value="not-soon"
                checked={orderHowSoon === 'not-soon'}
                onChange={(event) => handleSoonChange(event)}
              />
            </label>
          </fieldset>
          <button type="button" id="add-item" onClick={addItem}>
            Add Item
          </button>
        </div>
      </form>
    </>
  );
};

export default AddItem;
