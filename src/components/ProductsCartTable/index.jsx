/* eslint-disable react/prop-types */
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useCart } from '../../hooks/useCart.jsx';

import './styles.scss';

export default function ProductsCartTable({ products }) {
  const { removeProduct, updateProductAmount } = useCart();

  function handleProductIncrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId) {
    removeProduct(productId);
  }

  return (
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
        {products.map(product => (
          <tr key={product.id}>
            <td>
              <img
                src={`/assets/${product.image}`}
                alt={`imagem do ${product.name}`}
              />
            </td>
            <td>
              <strong>{product.name}</strong>
              <span>{product.priceFormatted}</span>
            </td>
            <td>
              <div className="quant-actions">
                <div>
                  <button
                    type="button"
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                  remover
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subTotal}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
