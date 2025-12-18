import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderList from './components/OrderList';
import AddOrder from './components/AddOrder';
import OrderDetails from './components/OrderDetails';
import OrderStatus from './components/OrderStatus';

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={OrderList} />
      <Route path="/add-order" component={AddOrder} />
      <Route path="/order/:id" exact component={OrderDetails} />
      <Route path="/order-status/:id" component={OrderStatus} />
    </Switch>
  );
};

export default App;