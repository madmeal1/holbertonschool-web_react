import { render } from '@testing-library/react';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList', () => {
  it('renders 5 rows when it receives an array of courses', () => {
    const { container } = render(<CourseList courses={courses} />);

    // 2 header rows + 3 course rows
    expect(container.querySelectorAll('tr')).toHaveLength(5);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(3);
  });

  it('renders 1 row when it receives an empty array', () => {
    const { container } = render(<CourseList courses={[]} />);

    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(container.querySelector('tbody tr').textContent).toMatch(
      /no course available yet/i
    );
  });

  it('renders 1 row when no courses prop is passed', () => {
    const { container } = render(<CourseList />);

    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
  });

  it('renders a table with the id CourseList and its two header rows', () => {
    const { container } = render(<CourseList courses={courses} />);

    expect(container.querySelector('table#CourseList')).toBeTruthy();
    expect(container.querySelectorAll('thead tr')).toHaveLength(2);
    expect(container.querySelector('thead th').getAttribute('colspan')).toBe('2');
  });
});
