import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import OrderList from './components/OrderList';
import AddOrder from './components/AddOrder';
import OrderDetails from './components/OrderDetails';
import OrderStatus from './components/OrderStatus';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <OrderProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={OrderList} />
          <Route path="/add-order" component={AddOrder} />
          <Route path="/order/:id" component={OrderDetails} />
          <Route path="/order-status/:id" component={OrderStatus} />
        </Switch>
      </Router>
    </OrderProvider>
  );
};

export default App;
