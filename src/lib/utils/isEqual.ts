type Indexed<T = unknown> = {
  [key in string]: T;
};

function isEqual(a: Indexed, b: Indexed): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default isEqual;
