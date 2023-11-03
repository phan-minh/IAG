import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./component/product";

function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    lineItems: [],
    totalCost: 0,
  });
  useEffect(() => {
    const getProducts = async () => {
      axios
        .get("http://localhost:4000/products")
        .then((res) => {
          setProducts(res.data.data.product);
        })
        .catch((err) => {
          throw err;
        });
    };
    getProducts();
  }, []);
  const addItem = (product, quantity) => {
    const newLineItem = { product, quantity };
    const updatedLineItems = [...order.lineItems, newLineItem];
    const totalCost = updatedLineItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    setOrder({
      lineItems: updatedLineItems,
      totalCost,
    });
  };
  const placeOrder = () => {
    axios
      .post("http://localhost:4000/products/orders", order)
      .then((response) => {
        setOrder({ lineItems: [], totalCost: 0 });
      })
      .catch((error) => console.error("Error placing order:", error));
  };
  return (
    <div className="App">
      <div>
        <h1>Products</h1>
        <ul>
          {products?.map((product) => (
            <Product product={product} handleAddItems={addItem}></Product>
          ))}
        </ul>

        <h2>Order</h2>
        <ul>
          {order.lineItems.map((lineItem, index) => (
            <li key={index}>
              {lineItem.product.name} - Quantity: {lineItem.quantity}
            </li>
          ))}
        </ul>
        <p>Total Cost: ${order.totalCost}</p>

        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default App;
