import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';

const OrderList = () => {
  const { orders } = useContext(OrderContext);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <Link to={`/order/${order.id}`}>{order.productName}</Link> - Quantity: {order.quantity} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
