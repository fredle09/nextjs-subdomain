import type { FormLabel } from "@/components/ui/form";
import type {
  Control,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";

export type TControllerRenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = ({
  field,
  fieldState,
  formState,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}) => React.ReactElement;

export interface IFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: React.ReactNode;
  control: Control<TFieldValues>;
  labelProps?: Omit<React.ComponentProps<typeof FormLabel>, "children">;
  formItemProps?: Omit<React.ComponentProps<"div">, "children">;
  isShowErrorMessage?: boolean;

  children: TControllerRenderProps<TFieldValues, TName>;
}
