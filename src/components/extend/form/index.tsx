import Show from "@/components/show";
import {
  FormItem,
  FormLabel,
  FormField as ShadcnFormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import type { IFormFieldProps } from "./type";
import type { FieldPath, FieldValues } from "react-hook-form";

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  labelProps,
  formItemProps,
  isShowErrorMessage = true,

  children,
}: IFormFieldProps<TFieldValues, TName>) {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={(...props) => (
        <FormItem {...formItemProps}>
          <Show when={label}>
            {(label) => <FormLabel {...labelProps}>{label}</FormLabel>}
          </Show>
          <FormControl>{children(...props)}</FormControl>
          <Show when={isShowErrorMessage}>
            <FormMessage />
          </Show>
        </FormItem>
      )}
    />
  );
}

export { FormField };
