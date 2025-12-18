import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useContext(OrderContext);

  const order = orders.find(o => o.id === parseInt(id));

  return (
    <div>
      {order ? (
        <>
          <h2>{order.productName}</h2>
          <p>Quantity: {order.quantity}</p>
          <Link to={`/order-status/${order.id}`}>Update Order Status</Link>
        </>
      ) : (
        <p>Order not found!</p>
      )}
    </div>
  );
};

export default OrderDetails;