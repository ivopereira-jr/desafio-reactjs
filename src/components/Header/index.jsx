import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from 'react-icons/md';

import '../../styles/assistants.scss';
import './styles.scss';

export default function Header() {
  return (
    <header className="container">
      <nav className="header-content">
        <Link to="/">
          <img src="/assets/logo.png" alt="logo marca playstation store" />
        </Link>

        <Link to="cart" className="cart">
          <div>
            <strong>Meu carrinho</strong>
            <span>0 item</span>
          </div>
          <MdAddShoppingCart size={36} color="#333" />
        </Link>
      </nav>
    </header>
  );
}
