import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';

const OrderList = () => {
  const { orders } = useContext(OrderContext);

  return (
    <div>
      <h2>Order List</h2>
      <Link to="/add-order">Add Order</Link>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <Link to={`/order/${order.id}`}>{order.productName}</Link>
          </li>
        ))}
        <li>
          <Link to="/order/999">Non-existent Order</Link>
        </li>
      </ul>
    </div>
  );
};

export default OrderList;