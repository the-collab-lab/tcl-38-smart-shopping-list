const ItemList = () => {
  return (
    <>
      <h1>Item List</h1>
      <h3>{localStorage.getItem('list-token')}</h3>
    </>
  );
};

export default ItemList;
