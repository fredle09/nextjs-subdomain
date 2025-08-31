export function getIconSize(size?: string | null) {
  switch (size) {
    case "sm":
      return "h-3 w-3";
    case "lg":
      return "h-5 w-5";
    case "icon":
      return "h-4 w-4";
    default:
      return "h-4 w-4";
  }
}
