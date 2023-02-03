export const sum = (a: number, b: number): number => {
  if (!a && !b) {
    throw new Error('arguments required');
  }

  return a - b;
};
