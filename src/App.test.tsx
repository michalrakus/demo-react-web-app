import React from 'react';
import { render } from '@testing-library/react';
import AppLocal from './AppLocal';

test('renders learn react link', () => {
  const { getByText } = render(<AppLocal />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
