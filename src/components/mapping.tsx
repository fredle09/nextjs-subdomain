import { createElement } from "react";

interface IMappingProps<T extends object, R = T> {
  as: React.ElementType;
  data?: Array<T> | readonly T[] | null;
  keyProps?: keyof T;
  transform?: (item: T) => R;
}

export default function Mapping<T extends object, R = T>({
  as: Component,
  data,
  keyProps,
  transform,
}: IMappingProps<T, R>) {
  return (data ?? []).map((item, idx) => {
    const keyValue = keyProps && item[keyProps];
    const key = (
      keyValue !== null && keyValue !== undefined ? keyValue : idx
    ) as React.Key;

    const transformedItem = transform ? transform(item) : item;
    return createElement(Component, { key, ...transformedItem });
  });
}
