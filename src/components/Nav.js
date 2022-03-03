import { NavLink } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Nav(props) {
  const { hasToken } = useToken();

  return (
    <nav>
      <NavLink to="/about" className="btn-about">
        how <br />
        to use
      </NavLink>
      {hasToken && (
        <>
          {props.currentPage === 'item-list' ? (
            <NavLink to="/add-item" className="btn-secondary  item-list">
              Add Item
            </NavLink>
          ) : (
            <NavLink to="/list" className="btn-secondary   add-item">
              Item List
            </NavLink>
          )}
        </>
      )}
    </nav>
  );
}
