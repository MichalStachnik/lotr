import { it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Movies from '../components/Movies';

/**
 * @vitest-environment happy-dom
 */
afterEach(() => cleanup());

it('should render', () => {
  render(<Movies />);

  const element = screen.getByTestId('movies');
  expect(element).toBeTruthy();
});
