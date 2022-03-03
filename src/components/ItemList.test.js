import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TokenProvider } from '../context/TokenContext';
import ItemList from './ItemList';

jest.mock('../context/TokenContext.js');
jest.mock('../hooks/useFirebaseSnapshot.js');

it('should display a list of items', () => {
  const { container } = render(
    <TokenProvider mockToken={'fake token'}>
      <MemoryRouter>
        <ItemList />
      </MemoryRouter>
    </TokenProvider>,
  );

  expect(container).toMatchSnapshot();
  screen.getByText('limes');
  screen.getByText('cereal');
});
