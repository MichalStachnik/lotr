import { it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Quotes from '../components/Quotes';

/**
 * @vitest-environment happy-dom
 */
afterEach(() => cleanup());

it('should render', () => {
  render(<Quotes />);

  const element = screen.getByTestId('quotes');
  expect(element).toBeTruthy();
});
