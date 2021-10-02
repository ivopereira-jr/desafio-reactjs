/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services/api.js';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem('@PlaygamesStore:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async productId => {
    try {
      const productInCart = cart.find(product => product.id === productId);

      if (productInCart) {
        const updateAmountProduct = cart.map(product =>
          product.id === productId
            ? { ...product, amount: productInCart.amount + 1 }
            : product
        );

        localStorage.setItem(
          '@PlaygamesStore:cart',
          JSON.stringify(updateAmountProduct)
        );

        setCart(updateAmountProduct);

        return;
      }

      const { data: product } = await api.get(`products/${productId}`);

      const newCart = [...cart, { ...product, amount: 1 }];

      localStorage.setItem('@PlaygamesStore:cart', JSON.stringify(newCart));

      setCart(newCart);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = productId => {
    try {
      const findProduct = cart.find(product => product.id === productId);

      if (!findProduct) {
        toast.error('Erro na remoção do produto');

        return;
      }

      const filterProducts = cart.filter(product => product.id !== productId);

      localStorage.setItem(
        '@PlaygamesStore:cart',
        JSON.stringify(filterProducts)
      );

      setCart(filterProducts);
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({ productId, amount }) => {
    try {
      if (amount < 1) return;

      const findProduct = cart.find(product => product.id === productId);

      if (!findProduct) {
        toast.error('Erro na alteração de quantidade do produto');

        return;
      }

      const updateProductAmountInCart = cart.map(product =>
        product.id === productId ? { ...product, amount } : product
      );

      localStorage.setItem(
        '@PlaygamesStore:cart',
        JSON.stringify(updateProductAmountInCart)
      );

      setCart(updateProductAmountInCart);
    } catch {
      return toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
