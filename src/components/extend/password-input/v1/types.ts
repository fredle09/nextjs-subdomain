import type { IInputV1Props } from "../../input/v1/types";

export interface IPasswordInputV1Props
  extends Omit<IInputV1Props, "type" | "endChild"> {
  showPasswordToggle?: boolean;
  defaultVisible?: boolean;
}
