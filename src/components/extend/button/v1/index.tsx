import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import Show from "@/components/show";
import { Button } from "@/components/ui/button";

import { getIconSize } from "./utils";

import type { IButtonV1Props } from "./types";

const ButtonV1 = React.forwardRef<HTMLButtonElement, IButtonV1Props>(
  (
    {
      className,
      variant,
      size,
      loading,
      disabled,
      children,
      startChild,
      endChild,
      ...props
    },
    ref
  ) => {
    const {
      when: isLoading = false,
      text: loadingText = "Loading...",
      align: loadingAlign = "start",
      Indicator,
    } = loading ?? {};

    const LoadingIndicator = React.useMemo(() => {
      return (
        Indicator ?? (
          <Loader2
            className={cn("animate-spin", getIconSize(size))}
            aria-hidden="true"
          />
        )
      );
    }, [loading?.Indicator, size]);

    const finalStartChild =
      isLoading && loadingAlign === "start" ? LoadingIndicator : startChild;
    const finalEndChild =
      isLoading && loadingAlign === "end" ? LoadingIndicator : endChild;

    const isDisabled = disabled || isLoading;

    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn("gap-2", className)}
        aria-label={isLoading ? loadingText : undefined}
        {...props}
      >
        {finalStartChild}
        <Show when={isLoading} fallback={children}>
          {loadingText}
        </Show>
        {finalEndChild}
      </Button>
    );
  }
);

ButtonV1.displayName = "ButtonV1";

export { ButtonV1 };
