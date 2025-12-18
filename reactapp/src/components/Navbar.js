import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Order List</Link></li>
        <li><Link to="/add-order">Add Order</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
