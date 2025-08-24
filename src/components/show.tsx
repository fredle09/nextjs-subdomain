export interface IShowProps<T, R = T> {
  when: T;
  fallback?: React.ReactNode;
  transform?: (value: T) => R;
  children: ((props: NonNullable<R>) => React.ReactNode) | React.ReactNode;
}

export default function Show<T, R = T>({
  when,
  fallback = null,
  children,
  transform,
}: IShowProps<T, R>) {
  const selectedValue = transform ? transform(when) : when;
  if (!selectedValue) {
    return <>{fallback}</>;
  }

  const props = selectedValue as NonNullable<R>;
  const result = typeof children === "function" ? children(props) : children;
  return result;
}
