import React, { useState, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

const AddOrder = () => {
  const { addOrder } = useContext(OrderContext);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(), // Unique ID based on timestamp
      productName,
      quantity,
      status
    };
    addOrder(newOrder);
    setProductName('');
    setQuantity(0);
    setStatus('Pending');
  };

  return (
    <div>
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={productName} 
          onChange={e => setProductName(e.target.value)} 
          placeholder="Product Name" 
        />
        <input 
          type="number" 
          value={quantity} 
          onChange={e => setQuantity(Number(e.target.value))} 
          placeholder="Quantity" 
        />
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default AddOrder;
