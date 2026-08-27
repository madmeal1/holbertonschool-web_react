import { render } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('renders without crashing', () => {
    expect(() => render(<Login />)).not.toThrow();
  });
});
