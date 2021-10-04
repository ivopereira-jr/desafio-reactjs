/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';

import { useCart } from '../../hooks/useCart.jsx';
import Cart from '../../pages/Cart/index.jsx';

const mockedUseCartHook = useCart;

jest.mock('../../hooks/useCart');

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }) => children,
  };
});

describe('Cart page', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [],
    });
  });

  it('no products in the cart', () => {
    render(<Cart />);

    expect(screen.getByText('O seu carrinho está vazio.')).toBeInTheDocument();
    expect(screen.getByText('continuar comprando')).toBeInTheDocument();
  });

  it('renders correctly products in the cart', () => {
    const { getAllByTestId, rerender } = render(<Cart />);

    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 2,
          id: 312,
          name: 'Super Mario Odyssey',
          price: 197.88,
          score: 100,
          image: 'super-mario-odyssey.png',
        },
        {
          amount: 1,
          id: 201,
          name: 'Call Of Duty Infinite Warfare',
          price: 49.99,
          score: 80,
          image: 'call-of-duty-infinite-warfare.png',
        },
      ],
    });

    rerender(<Cart />);

    const [firstProduct, secondProduct] = getAllByTestId('product');

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
