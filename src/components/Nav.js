import { NavLink } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Nav() {
  const { hasToken } = useToken();

  return (
    <nav>
      {' '}
      {hasToken && (
        <>
          <NavLink to="/list">Item List</NavLink>
          <NavLink to="/add-item">Add Item</NavLink>
        </>
      )}
    </nav>
  );
}