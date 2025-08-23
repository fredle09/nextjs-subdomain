"use client";
// Enhanced error handling utility
export function formatErrorMessage(error: unknown): {
  title: string;
  description?: string;
} {
  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      title: error.name || "Error",
      description: error.message,
    };
  }

  // Handle HTTP response errors
  if (typeof error === "object" && error !== null) {
    const httpError = error as {
      message?: string;
      status?: number;
      statusText?: string;
      response?: { data?: { message?: string; error?: string; }; };
    };

    if (httpError.response?.data?.message) {
      return {
        title: `Error ${httpError.status || ""}`,
        description: httpError.response.data.message,
      };
    }

    if (httpError.message) {
      return {
        title: httpError.statusText || "Request Failed",
        description: httpError.message,
      };
    }
  }

  return {
    title: "Something went wrong",
    description: String(error),
  };
}
