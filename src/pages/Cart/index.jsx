import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import '../../styles/assistants.scss';
import './styles.scss';

export default function Cart() {
  return (
    <main className="container cart-content">
      <div>
        <section className="list-cart-products">
          <table>
            <thead>
              <tr>
                <th aria-label="product image" />
                <th>produto</th>
                <th>quantidade</th>
                <th>subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="" alt="" />
                </td>
                <td>
                  <strong>fifa 14</strong>
                  <span>R$&nbsp; 0.00</span>
                </td>
                <td>
                  <div className="quant-actions">
                    <div>
                      <button type="button">
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                      />
                      <button type="button">
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                    <button type="button">
                      <MdDelete size={20} />
                      remover
                    </button>
                  </div>
                </td>
                <td>
                  <strong>R$&nbsp; 00.00</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <footer>
            <p>O frete é grátis para compras acima de R$ 250,00.</p>
          </footer>
        </section>
      </div>

      <section className="checkout">
        <header>
          <h2>checkout</h2>
        </header>

        <div>
          <span>
            Valor dos Produtos:
            <strong>R$&nbsp; 00.00</strong>
          </span>
          <span>
            Frete:
            <strong>R$&nbsp; 00.00</strong>
          </span>
          <span>
            Total:
            <strong>R$&nbsp; 00.00</strong>
          </span>
        </div>

        <footer>
          <button type="button">ir para pagamento</button>
          <button type="button">continuar comprando</button>
        </footer>
      </section>
    </main>
  );
}
