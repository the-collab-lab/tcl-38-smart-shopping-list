import { NavLink } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Nav(props) {
  const { hasToken } = useToken();

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(hasToken)
      .then(() => window.alert('Token copied to clipboard!'))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav>
      <NavLink to="/about">About</NavLink>
      {hasToken && (
        <>
          <button onClick={handleCopyClick}>Share Token</button>
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
