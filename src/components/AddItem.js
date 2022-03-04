import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../lib/firebase.js';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import cleanData from '../utils/cleanData.js';
import Nav from './Nav';
import logoS from '../assets/logogreyS.png';
import question from '../assets/question.png';

const AddItem = () => {
  const { docs } = useFirebaseSnapshot();
  const [itemName, setItemName] = useState('');
  const [message, setMessage] = useState('');
  const currentPage = 'add-item';

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
    'total purchases': 0,
    'estimated purchase interval': 0,
  };

  const nameArray = docs.map((doc) => {
    return cleanData(doc.data.name);
  });

  let cleanItemName = cleanData(itemName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nameArray.includes(cleanItemName)) {
        throw new Error(`${itemName} is already on the list!`);
      }

      await addDoc(collection(db, 'shopping-list'), itemToAdd);
      setMessage(`Hurray! ${itemName} was added to the list.`);
      setItemName('');
    } catch (error) {
      setMessage(error.message);
      setItemName('');
    }
  };

  return (
    <>
      <img
        src={logoS}
        alt="Logo: Welcome to Your Smart Shopping List"
        className="logo"
      />
      <div className="outer-box">
        <div className="inner-box">
          <form onSubmit={handleSubmit} className="">
            <label
              htmlFor="item-name"
              className="bg-gray-800 pr-2 pl-2 absolute left-1/2  -mt-4 text-xs uppercase tracking-wider transform -translate-x-1/2 text-white/80"
            >
              Add Item
            </label>
            <input
              required
              id="item-name"
              type="text"
              name="item-name"
              value={itemName}
              className="btn-primary text-white/80  text-2xl mt-9 w-[80%]"
              onChange={({ target }) => setItemName(target.value)}
            />
            <fieldset className="border-0 p-0">
              <legend className="text-sm text-white/80 uppercase tracking-wide pt-5 mb-4">
                How soon will
                <br /> you buy this again?
              </legend>

              {frequencyOptions.map(({ id, value, message }, index) => {
                return (
                  <div
                    key={index}
                    className="cursor-pointer hover:text-green-500 disabled:opacity-0.3"
                  >
                    <input
                      type="radio"
                      id={id}
                      name="buyAgain"
                      className="invisible"
                      value={value}
                      defaultChecked={!index}
                      onChange={({ target }) => setBuyAgainTime(target.value)}
                    />
                    <label
                      htmlFor={id}
                      className="text 1xl uppercase tracking-[1em] leading-10"
                    >
                      {message}
                    </label>
                  </div>
                );
              })}
            </fieldset>

            <button
              type="submit"
              className="relative bg-transparent border-0 z-20 w-4/5 h-40 text-white -mb-8 "
            >
              Add Item
            </button>
          </form>
          <img
            src={question}
            alt="question mark"
            className="max-h-40 -mt-40 scale-75"
          />
          <Nav currentPage={currentPage} />
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default AddItem;
