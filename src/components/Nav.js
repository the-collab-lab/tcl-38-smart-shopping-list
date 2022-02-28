import { NavLink } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Nav() {
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
      {' '}
      {hasToken && (
        <>
          <NavLink to="/list">Item List</NavLink>
          <NavLink to="/add-item">Add Item</NavLink>
          <button onClick={handleCopyClick}>Share Token</button>
        </>
      )}
    </nav>
  );
}
