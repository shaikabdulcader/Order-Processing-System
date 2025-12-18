import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';

const OrderStatus = () => {
  const { id } = useParams();
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const order = orders.find(o => o.id === parseInt(id));
  const history = useHistory();

  const [status, setStatus] = useState(order ? order.status : 'Pending');

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    updateOrderStatus(order.id, status);
    history.push(`/order/${order.id}`);
  };

  return (
    <div>
      <h2>Update Order Status for {order?.productName}</h2>
      <select value={status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleSubmit}>Update Status</button>
    </div>
  );
};

export default OrderStatus;
