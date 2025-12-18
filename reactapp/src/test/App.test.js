import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { OrderProvider } from '../context/OrderContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Custom render to wrap components with OrderProvider and Router
const customRender = (ui) => render(<OrderProvider><Router>{ui}</Router></OrderProvider>);

test('renders order list page and checks for initial orders', () => {
  customRender(<App />);
  const orderList = screen.getByText(/order list/i);
  expect(orderList).toBeInTheDocument();
});

test('adds new order and checks if it appears in the list', async () => {
  customRender(<App />);

  // Navigate to the add order page
  fireEvent.click(screen.getByText(/add order/i));

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'New Order' } });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), { target: { value: '5' } });

  // Submit the form
  fireEvent.click(screen.getByText(/submit/i));

  // Check if the new order appears in the order list
  await waitFor(() => {
    expect(screen.getByText('New Order')).toBeInTheDocument();
  });
});

test('displays correct details for an order when clicked', async () => {
  customRender(<App />);

  // Add a new order
  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Order 1' } });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), { target: { value: '10' } });
  fireEvent.click(screen.getByText(/submit/i));

  // Navigate to the order details page
  fireEvent.click(screen.getByText('Order 1'));

  // Check if the order details are displayed correctly
  expect(screen.getByText('Order 1')).toBeInTheDocument();
  expect(screen.getByText('Quantity: 10')).toBeInTheDocument();
});

test('increases quantity correctly in order status', async () => {
  customRender(<App />);

  // Add an order
  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Order 2' } });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), { target: { value: '5' } });
  fireEvent.click(screen.getByText(/submit/i));

  // Go to order status page
  fireEvent.click(screen.getByText('Order 2'));
  fireEvent.click(screen.getByText(/update order status/i));

  // Increase the quantity
  fireEvent.click(screen.getByText('+'));

  // Check if the quantity is updated
  expect(screen.getByText('Current Quantity: 6')).toBeInTheDocument();
});

test('decreases quantity correctly in order status', async () => {
  customRender(<App />);

  // Add an order
  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Order 3' } });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), { target: { value: '5' } });
  fireEvent.click(screen.getByText(/submit/i));

  // Go to order status page
  fireEvent.click(screen.getByText('Order 3'));
  fireEvent.click(screen.getByText(/update order status/i));

  // Decrease the quantity
  fireEvent.click(screen.getByText('-'));

  // Check if the quantity is updated
  expect(screen.getByText('Current Quantity: 4')).toBeInTheDocument();
});

test('renders "Order not found" if order does not exist in OrderDetails', () => {
  customRender(<App />);

  // Navigate to a non-existent order details page
  fireEvent.click(screen.getByText(/order list/i));
  fireEvent.click(screen.getByText('Non-existent Order'));

  // Check for "Order not found"
  expect(screen.getByText(/Order not found!/i)).toBeInTheDocument();
});

test('displays the correct text on order list page', () => {
  customRender(<App />);

  // Check if "Order List" text is present
  expect(screen.getByText(/Order List/)).toBeInTheDocument();
});

test('displays the correct text on Add Order page', () => {
  customRender(<App />);

  // Go to Add Order page
  fireEvent.click(screen.getByText(/add order/i));

  // Check if the form inputs and button are present
  expect(screen.getByPlaceholderText(/product name/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
});

test('checks if "Back to Order" button works in Order Status page', () => {
  customRender(<App />);

  // Add order and navigate to order status page
  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Order 4' } });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), { target: { value: '20' } });
  fireEvent.click(screen.getByText(/submit/i));
  fireEvent.click(screen.getByText('Order 4'));
  fireEvent.click(screen.getByText(/update order status/i));

  // Click the "Back to Order" button and check if we return to Order Details
  fireEvent.click(screen.getByText(/Back to Order/));
  expect(screen.getByText('Order 4')).toBeInTheDocument();
});

test('checks if Add Order button is working after adding an order', async () => {
  customRender(<App />);

  // Click Add Order
  fireEvent.click(screen.getByText(/add order/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Order 5' } });
  fireEvent.change(screen.getByPlaceholderText(/quantity/i), { target: { value: '30' } });
  fireEvent.click(screen.getByText(/submit/i));

  // Verify order list contains the new order
  await waitFor(() => {
    expect(screen.getByText('Order 5')).toBeInTheDocument();
  });
});
