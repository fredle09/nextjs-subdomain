import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import Show from "@/components/show";

import { InputV1 } from "../../input/v1";

import type { IPasswordInputV1Props } from "./types";

const PasswordInputV1 = forwardRef<HTMLInputElement, IPasswordInputV1Props>(
  ({ showPasswordToggle = true, defaultVisible = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(defaultVisible);

    const toggleVisibility = useCallback(() => {
      setIsVisible((prev) => !prev);
    }, []);

    const ToggleButton = () => (
      <button
        type="button"
        onClick={toggleVisibility}
        className={cn(
          "cursor-pointer transition-colors hover:text-foreground",
          "focus:outline-none focus:text-foreground"
        )}
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        <Show when={isVisible} fallback={<Eye className="size-4" />}>
          <EyeOff className="size-4" />
        </Show>
      </button>
    );

    return (
      <InputV1
        ref={ref}
        type={isVisible ? "text" : "password"}
        endChild={
          <Show when={showPasswordToggle}>
            <ToggleButton />
          </Show>
        }
        {...props}
      />
    );
  }
);

PasswordInputV1.displayName = "PasswordInputV1";

export { PasswordInputV1 };
