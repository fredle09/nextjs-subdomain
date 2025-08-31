import * as React from "react";

import { cn } from "@/lib/utils";
import Show from "@/components/show";
import { Input } from "@/components/ui/input";

import { getInputPadding, getContainerHeight, getChildIconSize } from "./utils";

import type { IInputV1Props } from "./types";

const InputV1 = React.forwardRef<HTMLInputElement, IInputV1Props>(
  (
    {
      className,
      containerClassName,
      size = "md",
      startChild,
      endChild,
      ...props
    },
    ref
  ) => {
    const hasStartChild = Boolean(startChild);
    const hasEndChild = Boolean(endChild);

    const padding = getInputPadding(size, hasStartChild, hasEndChild);
    const containerHeight = getContainerHeight(size);

    return (
      <div className={cn("relative", containerClassName)}>
        <Show when={startChild}>
          {(child) => (
            <div
              className={cn(
                "absolute left-0 top-0 z-10 flex items-center justify-center",
                containerHeight,
                "w-9 text-muted-foreground",
                "[&>*]:flex [&>*]:items-center [&>*]:justify-center"
              )}
            >
              <div className={getChildIconSize(size)}>{child}</div>
            </div>
          )}
        </Show>

        <Input
          ref={ref}
          className={cn(
            padding.vertical,
            padding.horizontal,
            containerHeight,
            className
          )}
          {...props}
        />

        <Show when={endChild}>
          {(child) => (
            <div
              className={cn(
                "absolute right-0 top-0 z-10 flex items-center justify-center",
                containerHeight,
                "w-9 text-muted-foreground",
                "[&>*]:flex [&>*]:items-center [&>*]:justify-center"
              )}
            >
              <div className={getChildIconSize(size)}>{child}</div>
            </div>
          )}
        </Show>
      </div>
    );
  }
);

InputV1.displayName = "InputV1";

export { InputV1 };
