import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TokenProvider } from '../context/TokenContext';
import ItemList from './ItemList';

jest.mock('../context/TokenContext.js');

const items = [
  {
    id: 1,
    data: {
      'estimated purchase interval': 0,
      'last purchased': 'February 27, 2022 at 1:49:20 PM UTC-8',
      name: 'limes',
      'next purchase': 7,
      token: 'diana lou lead',
      'total purchases': 1,
    },
  },
  {
    id: 2,
    data: {
      'estimated purchase interval': 0,
      'last purchased': null,
      name: 'cereal',
      'next purchase': 14,
      token: 'diana lou lead',
      'total purchases': 0,
    },
  },
];

const loading = false;

it('should display a list of items', () => {
  const { container } = render(
    <TokenProvider mockToken={'fake token'}>
      <MemoryRouter>
        <ItemList docs={items} loading={loading} />
      </MemoryRouter>
    </TokenProvider>,
  );

  expect(container).toMatchSnapshot();
  screen.getByText('limes');
  screen.getByText('cereal');
});
