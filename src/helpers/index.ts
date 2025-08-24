export function parseToArray<T>(label: T | Array<T>): Array<T> {
  if (Array.isArray(label)) {
    return label;
  }
  return [label];
}
