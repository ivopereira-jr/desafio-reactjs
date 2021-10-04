/* eslint-disable no-undef */
import AxiosMock from 'axios-mock-adapter';
import { waitFor, render, fireEvent } from '@testing-library/react';

import Home from '../../pages/Home/index.jsx';
import { useCart } from '../../hooks/useCart.jsx';
import { api } from '../../services/api.js';

const apiMock = new AxiosMock(api);
const mockedAddProduct = jest.fn();
const mockedUseCartHook = useCart;

jest.mock('../../hooks/useCart.jsx');

describe('Home Page', () => {
  beforeAll(() => {
    apiMock.onGet('products').reply(200, [
      {
        id: 1,
        name: 'Super Mario Odyssey',
        price: 197.88,
        score: 100,
        image: 'super-mario-odyssey.png',
      },
      {
        id: 2,
        name: 'Call Of Duty Infinite Warfare',
        price: 49.99,
        score: 80,
        image: 'call-of-duty-infinite-warfare.png',
      },
      {
        id: 3,
        name: 'The Witcher III Wild Hunt',
        price: 119.5,
        score: 250,
        image: 'the-witcher-iii-wild-hunt.png',
      },
    ]);
  });

  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 2,
          id: 1,
          name: 'Super Mario Odyssey',
          price: 197.88,
          score: 100,
          image: 'super-mario-odyssey.png',
        },
        {
          amount: 1,
          id: 2,
          name: 'Call Of Duty Infinite Warfare',
          price: 49.99,
          score: 80,
          image: 'call-of-duty-infinite-warfare.png',
        },
      ],
      addProduct: mockedAddProduct,
    });
  });

  it('should be able to render each product quantity added to cart', async () => {
    const { getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('cart-product-quantity'), {
      timeout: 200,
    });

    const [
      firstProductCartQuantity,
      secondProductCartQuantity,
      thirdProductCartQuantity,
    ] = getAllByTestId('cart-product-quantity');

    expect(firstProductCartQuantity).toHaveTextContent('2');
    expect(secondProductCartQuantity).toHaveTextContent('1');
    expect(thirdProductCartQuantity).toHaveTextContent('0');
  });

  it('should be able to add a product to cart', async () => {
    const { getAllByTestId, rerender } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), {
      timeout: 200,
    });

    const [addFirstProduct] = getAllByTestId('add-product-button');

    fireEvent.click(addFirstProduct);

    expect(mockedAddProduct).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 3,
          id: 1,
          name: 'Super Mario Odyssey',
          price: 197.88,
          score: 100,
          image: 'super-mario-odyssey.png',
        },
      ],
    });

    rerender(<Home />);

    const [firstProductCartQuantity] = getAllByTestId('cart-product-quantity');

    expect(firstProductCartQuantity).toHaveTextContent('3');
  });
});
