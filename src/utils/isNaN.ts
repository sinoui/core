function isNaN<T>(value: T): boolean {
  // eslint-disable-next-line no-self-compare
  return value !== value;
}

export default isNaN;
