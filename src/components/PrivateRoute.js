import { Navigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function PrivateRoute({ children }) {
  const { hasToken } = useToken();

  return hasToken ? children : <Navigate to="/" />;
}
