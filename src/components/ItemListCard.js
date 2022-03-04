export const ItemListCard = ({ data }) => {
  return (
    <ul className="bg-transparent uppercase border-dotted border-white/80 border-t-transparent md:border-b-transparent">
      <li className="text-green-soon text-3xl  border-l-transparent md:border-r-1">
        Soon
      </li>
      <li className="text-yellow-kinda-soon border-l-transparent md:border-r-1">
        Kind of Soon
      </li>
      <li className="text-blue-not-soon border-l-transparent md:border-r-1">
        Not Soon
      </li>
      <li className="text-grey-inactive border-transparent">Inactive</li>
    </ul>
  );
};

export default ItemListCard;
