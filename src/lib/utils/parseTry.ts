export const parseTry = (data: string): any => {
  try {
    return JSON.parse(data);
  } catch {}
};
