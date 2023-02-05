import '@testing-library/jest-dom';

jest.mock('nanoid', () => {
  const nanoid = (): string => {
    return Math.round(Math.random() * 10000).toString();
  };
  return { nanoid };
});
