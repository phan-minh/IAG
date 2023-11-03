import { useEffect, useState } from 'react';

function Product(props) {
  const { product, handleAddItems } = props;
  return (
    <div className="d-flex justify-content-between align-items-center">
      <li key={product.id}>
        {product.name} - ${product.price}
        <button
          className="btn btn-primary"
          onClick={() => handleAddItems(product, 1)}
        >
          Add to Order
        </button>
      </li>
    </div>
  );
}

export default Product;
