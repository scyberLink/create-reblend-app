import Scansio from 'scansio';
import { render, screen } from '@testing-library/scansio';
import App from './App';

test('renders learn scansio link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn scansio/i);
  expect(linkElement).toBeInTheDocument();
});
