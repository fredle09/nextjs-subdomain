export function getInputPadding(size?: "sm" | "md" | "lg", hasStartChild?: boolean, hasEndChild?: boolean) {
  const basePadding = {
    sm: "py-1",
    md: "py-1",
    lg: "py-2",
  };

  const horizontalPadding = {
    left: hasStartChild ? "pl-9" : "pl-3",
    right: hasEndChild ? "pr-9" : "pr-3",
  };

  return {
    vertical: basePadding[size || "md"],
    horizontal: `${horizontalPadding.left} ${horizontalPadding.right}`,
  };
}

export function getContainerHeight(size?: "sm" | "md" | "lg") {
  switch (size) {
    case "sm":
      return "h-8";
    case "lg":
      return "h-11";
    default:
      return "h-9";
  }
}

export function getChildIconSize(size?: "sm" | "md" | "lg") {
  switch (size) {
    case "sm":
      return "h-3 w-3";
    case "lg":
      return "h-5 w-5";
    default:
      return "h-4 w-4";
  }
}
