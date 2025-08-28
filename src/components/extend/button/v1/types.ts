import { buttonVariants } from "@/components/ui/button";

import type { VariantProps } from "class-variance-authority";

type TLoadingConfig = {
  when: boolean;
  text?: string;
  align?: "start" | "end";
  Indicator?: React.ReactNode;
};

type TButtonV1PropsBase = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children?: React.ReactNode;
  };

type TButtonV1PropsWithStartChild = TButtonV1PropsBase & {
  startChild: React.ReactNode;
  endChild?: never;
  loading?: Omit<TLoadingConfig, "align"> & { align?: "end" };
};

type TButtonV1PropsWithEndChild = TButtonV1PropsBase & {
  startChild?: never;
  endChild: React.ReactNode;
  loading?: Omit<TLoadingConfig, "align"> & { align?: "start" };
};

type TButtonV1PropsWithoutExtra = TButtonV1PropsBase & {
  startChild?: never;
  endChild?: never;
  loading?: TLoadingConfig;
};

export type IButtonV1Props =
  | TButtonV1PropsWithStartChild
  | TButtonV1PropsWithEndChild
  | TButtonV1PropsWithoutExtra;
