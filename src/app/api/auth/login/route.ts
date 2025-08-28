import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // TODO: Implement real authentication
    // In a real app, you would validate against a database
    if (email === "admin@example.com" && password === "admin123") {
      // Mock successful response
      const response = {
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
        },
        token: "mock-jwt-token-" + Date.now(),
        refreshToken: rememberMe ? "mock-refresh-token-" + Date.now() : undefined,
      };

      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
