import { render, screen } from '@testing-library/react';
import Calculator from './App';

test('renders learn react link', () => {
  render(<Calculator />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
