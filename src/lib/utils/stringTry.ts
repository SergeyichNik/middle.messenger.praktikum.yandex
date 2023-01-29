export const stringTry = (data: Record<string, any>): string => {
  try {
    return JSON.stringify(data);
  } catch {
    return '';
  }
};
