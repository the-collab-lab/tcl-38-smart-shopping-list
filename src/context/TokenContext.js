import { createContext, useContext, useMemo, useState } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [hasToken, setHasToken] = useState(token ? token : '');

  const value = useMemo(() => ({ hasToken, setHasToken }), [hasToken]);

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken not used inside TokenProvider');
  }
  return context;
};

export { TokenContext, TokenProvider, useToken };
