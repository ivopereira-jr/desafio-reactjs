/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import { useCart } from '../../hooks/useCart.jsx';

import ProductsCartTable from '../../components/ProductsCartTable/index.jsx';
import { formatPrice } from '../../utils/format.js';

import '../../styles/assistants.scss';
import './styles.scss';

export default function Cart() {
  const { cart } = useCart();
  const cartSize = cart.length;
  const [transportFree, setTransportFree] = useState(false);

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.amount * product.price),
  }));

  const productsCostTotal = cart.reduce(
    (sumTotal, product) => sumTotal + product.amount * product.price,
    0
  );

  const transportCost = formatPrice(
    cart.reduce((sumTotal, product) => sumTotal + product.amount * 10, 0)
  );

  const totalCost = formatPrice(
    cart.reduce(
      (sumTotal, product) =>
        sumTotal + product.amount * 10 + product.amount * product.price,
      0
    )
  );

  useEffect(() => {
    if (productsCostTotal > 250) {
      setTransportFree(true);
    } else {
      setTransportFree(false);
    }
  }, [productsCostTotal]);

  return (
    <>
      {cartSize === 0 ? (
        <main className="empty-cart">
          <div className="empty-cart-content">
            <h2>O seu carrinho está vazio.</h2>
            <Link to="/">
              <button type="button">
                <MdShoppingCart size={20} color="#FFF" />
                continuar comprando
              </button>
            </Link>
          </div>
        </main>
      ) : (
        <main className="container cart-content">
          <div className="list-cart-container">
            <section className="list-cart-products card">
              <ProductsCartTable products={cartFormatted} />

              <footer>
                <p>O frete é grátis para compras acima de R$ 250,00.</p>
              </footer>
            </section>
          </div>

          <section className="checkout card">
            <header>
              <h2>checkout</h2>
            </header>

            <div>
              <span>
                Valor dos Produtos:
                <strong>{formatPrice(productsCostTotal)}</strong>
              </span>
              <span>
                Frete:
                <strong>{transportFree ? 'grátis' : transportCost}</strong>
              </span>
              <span>
                Total:
                <strong>
                  {transportFree ? formatPrice(productsCostTotal) : totalCost}
                </strong>
              </span>
            </div>

            <footer>
              <button type="button">ir para pagamento</button>
              <Link to="/">
                <button type="button">continuar comprando</button>
              </Link>
            </footer>
          </section>
        </main>
      )}
    </>
  );
}
