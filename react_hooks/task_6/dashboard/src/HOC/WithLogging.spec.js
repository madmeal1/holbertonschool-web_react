import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

const MockAppWithLogging = WithLogging(MockApp);

describe('WithLogging', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    logSpy.mockRestore();
  });

  it('renders a heading element with the text Hello from Mock App Component', () => {
    render(<MockAppWithLogging />);

    expect(screen.getByRole('heading', { name: 'Hello from Mock App Component' })).toBeInTheDocument();
  });

  it('sets the displayName to WithLogging(NAME_OF_THE_WRAPPED_COMPONENT)', () => {
    expect(MockAppWithLogging.displayName).toBe('WithLogging(MockApp)');
  });

  it('defaults the displayName to WithLogging(Component) when the wrapped component has no name', () => {
    expect(WithLogging(() => <p>anonymous</p>).displayName).toBe('WithLogging(Component)');
  });

  it('logs on mount and before unmount', () => {
    const { unmount } = render(<MockAppWithLogging />);
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });
});
