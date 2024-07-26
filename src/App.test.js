import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./CustomRoutes', () => () => <div data-testid="custom-routes">Mocked Routes</div>);

test('renders CustomRoutes', () => {
  render(<App />);
  // You might need to add a testid to CustomRoutes component
  const routesElement = screen.getByTestId('custom-routes');
  expect(routesElement).toBeInTheDocument();
});