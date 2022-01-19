import { getToken, words } from '@the-collab-lab/shopping-list-utils';

const CreateNewList = () => {
  const createAndSetToken = (e) => {
    e.preventDefault();
    var token = getToken();
    localStorage.setItem('list-token', token);
    window.location.href = '/';
  };

  return <button onClick={createAndSetToken}>Create a new list</button>;
};

export default CreateNewList;
