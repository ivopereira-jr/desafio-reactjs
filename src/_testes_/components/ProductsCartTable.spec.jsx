/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';

import ProductsCartTable from '../../components/ProductsCartTable/index.jsx';

const mockedRemoveProduct = jest.fn();
const mockedUpdateProductAmount = jest.fn();

jest.mock('../../hooks/useCart');

const productsMock = [
  {
    amount: 1,
    id: 1,
    name: 'Super Mario Odyssey',
    price: 197.88,
    score: 100,
    image: 'super-mario-odyssey.png',
  },
  {
    amount: 2,
    id: 2,
    name: 'Call Of Duty Infinite Warfare',
    price: 49.99,
    score: 80,
    image: 'call-of-duty-infinite-warfare.png',
  },
];

jest.mock('../../hooks/useCart.jsx', () => {
  return {
    useCart: () => ({
      removeProduct: mockedRemoveProduct,
      updateProductAmount: mockedUpdateProductAmount,
    }),
  };
});

describe('Products cart list', () => {
  it('renders correctly', () => {
    render(<ProductsCartTable products={productsMock} />);

    expect(screen.getByText('Super Mario Odyssey')).toBeInTheDocument();
    expect(
      screen.getByText('Call Of Duty Infinite Warfare')
    ).toBeInTheDocument();
  });

  it('should be able to increase a product amount', () => {
    const { getAllByTestId, rerender } = render(
      <ProductsCartTable products={productsMock} />
    );

    const [incrementFirstProduct] = getAllByTestId('increment-product');

    const [firstProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');

    fireEvent.click(incrementFirstProduct);

    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 2,
      productId: 1,
    });

    const productsMockUpdate = [
      {
        amount: 2,
        id: 1,
        name: 'Super Mario Odyssey',
        price: 197.88,
        score: 100,
        image: 'super-mario-odyssey.png',
      },
      {
        amount: 2,
        id: 2,
        name: 'Call Of Duty Infinite Warfare',
        price: 49.99,
        score: 80,
        image: 'call-of-duty-infinite-warfare.png',
      },
    ];

    rerender(<ProductsCartTable products={productsMockUpdate} />);

    expect(firstProductAmount).toHaveDisplayValue('2');
  });

  it('should not be able to decrease a product amount when value is 1', () => {
    const { getAllByTestId } = render(
      <ProductsCartTable products={productsMock} />
    );

    const [decrementFirstProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');

    fireEvent.click(decrementFirstProduct);

    expect(decrementFirstProduct).toHaveProperty('disabled');
    expect(mockedUpdateProductAmount).not.toHaveBeenCalled();
  });

  it('shoud be able to remove a product', () => {
    const { getAllByTestId, rerender } = render(
      <ProductsCartTable products={productsMock} />
    );

    const [removeFirstProduct] = getAllByTestId('remove-product');
    const [firstProduct, secondProduct] = getAllByTestId('product');

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();

    fireEvent.click(removeFirstProduct);

    expect(mockedRemoveProduct).toHaveBeenCalledWith(1);

    const productsMockUpdate = [
      {
        amount: 2,
        id: 2,
        name: 'Call Of Duty Infinite Warfare',
        price: 49.99,
        score: 80,
        image: 'call-of-duty-infinite-warfare.png',
      },
    ];

    rerender(<ProductsCartTable products={productsMockUpdate} />);

    expect(firstProduct).not.toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
