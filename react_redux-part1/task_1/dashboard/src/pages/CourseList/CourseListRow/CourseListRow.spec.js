import { render } from '@testing-library/react';
import CourseListRow from './CourseListRow';

// A <tr> is only valid inside a table section, so render into a <tbody>
// container to keep React's DOM nesting validation quiet.
const renderRow = (props) =>
  render(<CourseListRow {...props} />, {
    container: document.body.appendChild(document.createElement('tbody')),
  });

describe('CourseListRow', () => {
  describe('when isHeader is true', () => {
    it('renders one th with colspan 2 when textSecondCell is null', () => {
      const { container } = renderRow({ isHeader: true, textFirstCell: 'Available courses' });
      const headers = container.querySelectorAll('th');

      expect(headers).toHaveLength(1);
      expect(headers[0].getAttribute('colspan')).toBe('2');
      expect(headers[0].textContent).toBe('Available courses');
    });

    it('renders two th cells when textSecondCell is not null', () => {
      const { container } = renderRow({
        isHeader: true,
        textFirstCell: 'Course name',
        textSecondCell: 'Credit',
      });
      const headers = container.querySelectorAll('th');

      expect(headers).toHaveLength(2);
      expect(headers[0].textContent).toBe('Course name');
      expect(headers[1].textContent).toBe('Credit');
      expect(container.querySelectorAll('td')).toHaveLength(0);
    });
  });

  describe('when isHeader is false', () => {
    it('renders two td elements within a tr element', () => {
      const { container } = renderRow({ textFirstCell: 'ES6', textSecondCell: '60' });
      const row = container.querySelector('tr');

      expect(row).toBeTruthy();
      expect(row.querySelectorAll('td')).toHaveLength(2);
      expect(row.querySelectorAll('th')).toHaveLength(0);
      expect(row.querySelectorAll('td')[0].textContent).toBe('ES6');
      expect(row.querySelectorAll('td')[1].textContent).toBe('60');
    });
  });
});
