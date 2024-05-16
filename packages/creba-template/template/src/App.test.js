import { render, screen } from '@testing-library/reblend';
import App from './App';

test('renders learn reblend link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn reblend/i);
  expect(linkElement).toBeInTheDocument();
});
