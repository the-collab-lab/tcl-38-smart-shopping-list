export default function Item({
  item,
  handleChecked,
  handleDelete,
  within24Hours,
  itemStatus,
}) {
  return (
    <li
      key={item.id}
      aria-label={
        itemStatus(item) === 'inactive'
          ? `${item.data.name} is inactive`
          : `Need to buy ${item.data.name} ${itemStatus(item)}`
      }
      className={itemStatus(item).replace(/\s+/g, '')}
    >
      {' '}
      <input
        aria-label="purchase item"
        type="checkbox"
        onChange={() => handleChecked(item.id, item)}
        checked={within24Hours(item)}
        disabled={within24Hours(item)}
      />{' '}
      {item.data.name}
      <button
        type="button"
        aria-label={`delete ${item.data.name}`}
        onClick={() => handleDelete(item.id, item.data.name)}
      >
        Delete
      </button>
    </li>
  );
}
