import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('getCurrentYear', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
  });

  it('reads the year from the system clock', () => {
    jest.useFakeTimers().setSystemTime(new Date('2015-03-14T12:00:00Z'));
    expect(getCurrentYear()).toBe(2015);
  });
});

describe('getFooterCopy', () => {
  it('returns "Holberton School" when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  it('returns "Holberton School main dashboard" when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  it('returns the urgent requirement string', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });
});
