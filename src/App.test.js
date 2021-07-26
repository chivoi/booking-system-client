import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders nav', () => {
  const { getByText } = render(<App/>);
  const nav = getByText(/Sign Up/i)
  expect(nav).toBeInTheDocument();
});
