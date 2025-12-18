import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders(prevOrders => [...prevOrders, order]);
  };

  const updateOrderQuantity = (id, newQuantity) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, quantity: newQuantity } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderQuantity }}>
      {children}
    </OrderContext.Provider>
  );
};