export const logger = (
  l: string,
  e?: any,
  b: string | undefined = '#3677ef',
  c: string | undefined = 'white',
): void => {
  // eslint-disable-next-line no-console
  console.log(
    `%cfrom ${l}`,
    `color: ${c}; background: ${b}; padding: 2px 5px; border-radius: 4px;`,
    e,
  );
};
