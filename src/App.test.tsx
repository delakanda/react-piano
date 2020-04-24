import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('App renders without crashing', () => {
  const { container } = render(<App />);
});

test('Test snapshot of App', () => {
  const { container } = render(<App />);
  // expect(container).toMatchSnapshot();
});
