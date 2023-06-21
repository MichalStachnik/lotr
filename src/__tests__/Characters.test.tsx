import { it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Characters from '../components/Characters';

/**
 * @vitest-environment happy-dom
 */
afterEach(() => cleanup());

it('should render', () => {
  render(<Characters />);

  const element = screen.getByTestId('characters');
  expect(element).toBeTruthy();
});
