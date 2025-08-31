import type { TInputProps } from "@/components/ui/input";

type TInputV1PropsBase = Omit<TInputProps, "size"> & {
  size?: "sm" | "md" | "lg";
  className?: string;
  containerClassName?: string;
};

type TInputV1PropsWithStartChild = TInputV1PropsBase & {
  startChild: React.ReactNode;
  endChild?: never;
};

type TInputV1PropsWithEndChild = TInputV1PropsBase & {
  startChild?: never;
  endChild: React.ReactNode;
};

type TInputV1PropsWithBothChildren = TInputV1PropsBase & {
  startChild: React.ReactNode;
  endChild: React.ReactNode;
};

type TInputV1PropsWithoutExtra = TInputV1PropsBase & {
  startChild?: never;
  endChild?: never;
};

export type IInputV1Props =
  | TInputV1PropsWithStartChild
  | TInputV1PropsWithEndChild
  | TInputV1PropsWithBothChildren
  | TInputV1PropsWithoutExtra;
