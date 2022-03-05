import React from 'react';
import ReactDOM from 'react-dom';
import { TokenProvider } from './context/TokenContext';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TokenProvider>
      <App />
    </TokenProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
