import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';

const AddOrder = () => {
  const { addOrder } = useContext(OrderContext);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      productName,
      quantity: parseInt(quantity)
    };
    addOrder(newOrder);
    history.push('/');
  };

  return (
    <div>
      <h2>Add Order</h2>
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
          onChange={e => setQuantity(e.target.value)} 
          placeholder="Quantity" 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrder;