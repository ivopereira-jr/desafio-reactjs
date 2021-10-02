import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from 'react-icons/md';

import '../../styles/assistants.scss';
import './styles.scss';
import { useCart } from '../../hooks/useCart.jsx';

export default function Header() {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <header className="container">
      <nav className="header-content">
        <Link to="/">
          <img src="/assets/logo.png" alt="logo marca playstation store" />
        </Link>

        <Link to="cart" className="cart">
          <div>
            <strong>Meu carrinho</strong>
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </div>
          <MdAddShoppingCart size={36} color="#333" />
        </Link>
      </nav>
    </header>
  );
}
