import { NavLink } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Nav(props) {
  const { hasToken } = useToken();

  return (
    <nav>
      {hasToken && (
        <>
          {props.currentPage === 'item-list' ? (
            <NavLink
              to="/add-item"
              className="btn-primary uppercase mt-20 mb-8 list"
            >
              Item List
            </NavLink>
          ) : (
            <NavLink
              to="/list"
              className="btn-primary uppercase mt-20 mb-8 add-item"
            >
              Add Item
            </NavLink>
          )}
        </>
      )}
    </nav>
  );
}
