import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import CourseList from './CourseList';

const renderWithStore = (courses) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: { courses: { courses } },
  });

  return render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );
};

test('it should render the CourseList component with 5 rows', () => {
  renderWithStore([
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ]);

  const rowElements = screen.getAllByRole('row');

  expect(rowElements).toHaveLength(5)
})

test('it should render the CourseList component with 1 row', () => {
  renderWithStore([]);

  const rowElement = screen.getAllByRole('row');
  const rowText = screen.getByText(/No course available yet/i);

  expect(rowElement).toHaveLength(1)
  expect(rowText).toBeInTheDocument()
});
