//MOCK TOKEN CONTEXT
import { createContext, useContext, useMemo, useState } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ mockToken, children }) => {
  const [hasToken, setHasToken] = useState(mockToken ? mockToken : '');

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
