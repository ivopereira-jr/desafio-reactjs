/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import Header from '../../components/Header/index.jsx';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }) => children,
  };
});

jest.mock('../../hooks/useCart.jsx', () => {
  return {
    useCart: () => ({
      cart: [
        {
          id: 312,
          name: 'Super Mario Odyssey',
          price: 197.88,
          score: 100,
          image: 'super-mario-odyssey.png',
        },
        {
          id: 201,
          name: 'Call Of Duty Infinite Warfare',
          price: 49.99,
          score: 80,
          image: 'call-of-duty-infinite-warfare.png',
        },
      ],
    }),
  };
});

describe('Header Component', () => {
  it('should be able to render the amount of produts added to cart', () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter).toHaveTextContent('2 itens');
  });
});
