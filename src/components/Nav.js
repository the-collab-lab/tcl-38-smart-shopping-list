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
      <NavLink to="/about" className="btn-nav btn-about">
        how <br />
        to use
      </NavLink>
      {hasToken && (
        <>
          <button onClick={handleCopyClick} className="  btn-nav btn-token">
            Share <br />
            Token
          </button>
          {props.currentPage === 'item-list' ? (
            <NavLink
              to="/add-item"
              className="btn-secondary btn-primary item-list"
            >
              Add Item
            </NavLink>
          ) : (
            <NavLink to="/list" className="btn-secondary btn-primary add-item">
              Item List
            </NavLink>
          )}
        </>
      )}
    </nav>
  );
}
