import { serverTimestamp, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { Link } from 'react-router-dom';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';

const ItemList = () => {
  const docs = useFirebaseSnapshot();

  const handleChecked = async (id) => {
    //console.log used for testing checked item and manipulating last purchased time in db
    console.log(id);
    const docRef = doc(db, 'shopping-list', id);
    await updateDoc(docRef, {
      'last purchased': serverTimestamp(),
    });
  };

  const within24Hours = (item) => {
    // Seconds in 24 hours
    // 60 x 60 x 24 = 86400
    const now = Timestamp.now();
    if (item.data['last purchased']) {
      if (now.seconds - item.data['last purchased'].seconds < 86400) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <h2>Smart Shopping List</h2>
      <ul>
        {docs.length > 0 ? (
          docs.map((item) => (
            <li key={item.id}>
              {' '}
              <input
                aria-label="purchase item"
                type="checkbox"
                onChange={() => handleChecked(item.id)}
                checked={within24Hours(item)}
                disabled={within24Hours(item)}
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
