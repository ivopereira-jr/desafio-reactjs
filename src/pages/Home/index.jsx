/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useCart } from '../../hooks/useCart.jsx';
import { api } from '../../services/api.js';
import { formatPrice } from '../../utils/format.js';

import '../../styles/assistants.scss';
import './styles.scss';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {});

  useEffect(() => {
    async function loadProducts() {
      const responseProducts = await api
        .get('products')
        .then(response => response.data);

      const resultProducts = responseProducts.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(resultProducts);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    addProduct(id);
  }

  return (
    <div className="container">
      <ul className="productsList">
        {products.map(product => (
          <li key={product.id}>
            <img
              src={`/assets/${product.image}`}
              alt={`imagem do ${product.name}`}
            />
            <strong>{product.name}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
