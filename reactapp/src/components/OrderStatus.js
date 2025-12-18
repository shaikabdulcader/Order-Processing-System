import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';

const OrderStatus = () => {
  const { id } = useParams();
  const { orders, updateOrderQuantity } = useContext(OrderContext);
  const order = orders.find(o => o.id === parseInt(id));

  const increaseQuantity = () => {
    updateOrderQuantity(order.id, order.quantity + 1);
  };

  const decreaseQuantity = () => {
    updateOrderQuantity(order.id, order.quantity - 1);
  };

  return (
    <div>
      <h2>Order Status</h2>
      <p>Current Quantity: {order?.quantity}</p>
      <button onClick={increaseQuantity}>+</button>
      <button onClick={decreaseQuantity}>-</button>
      <Link to={`/order/${order?.id}`}>Back to Order</Link>
    </div>
  );
};

export default OrderStatus;