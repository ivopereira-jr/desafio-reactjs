/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useCart } from '../../hooks/useCart.jsx';
import { api } from '../../services/api.js';
import { formatPrice } from '../../utils/format.js';
import { sortOrderProducts } from '../../utils/order.js';

import '../../styles/assistants.scss';
import './styles.scss';

export default function Home() {
  const { addProduct, cart } = useCart();
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState('');

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

  useEffect(() => {
    if (products.length > 0) {
      const newListProducts = [...products];

      const productsSorted = sortOrderProducts(newListProducts, orderProducts);

      setProducts(productsSorted);
    }
  }, [orderProducts]);

  function handleAddProduct(id) {
    addProduct(id);
  }

  function handleOrderProducts(e) {
    setOrderProducts(e.target.value);
  }

  return (
    <div className="container">
      <div className="order-products">
        <span>Ordenar por</span>
        <select
          name="order"
          id="order"
          value={orderProducts}
          onChange={e => handleOrderProducts(e)}
        >
          <option disabled value="">
            Selecione
          </option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
          <option value="score">Popularidade</option>
          <option value="alpha">Ordem alfabética</option>
        </select>
      </div>

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
