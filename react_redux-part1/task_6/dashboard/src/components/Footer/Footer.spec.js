import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import authReducer, { login, logout } from '../../features/auth/authSlice';
import { act } from 'react';

const createStore = () => configureStore({ reducer: { auth: authReducer } });

const renderWithStore = (store) =>
  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

test('It should render footer with copyright text', () => {
  renderWithStore(createStore());

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  renderWithStore(createStore());

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const store = createStore();
  store.dispatch(login({ email: 'test@test.com', password: 'password123' }));
  renderWithStore(store);

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});

test('Contact us link disappears when the user logs out', () => {
  const store = createStore();
  store.dispatch(login({ email: 'test@test.com', password: 'password123' }));
  renderWithStore(store);

  act(() => {
    store.dispatch(logout());
  });

  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});
