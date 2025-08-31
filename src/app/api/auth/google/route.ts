import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Mock Google OAuth response
    // In a real app, you would handle Google OAuth flow
    const response = {
      user: {
        id: "2",
        email: "admin@google.com",
        name: "Google Admin",
        role: "admin",
      },
      token: "mock-google-jwt-token-" + Date.now(),
      refreshToken: "mock-google-refresh-token-" + Date.now(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Google login error:", error);
    return NextResponse.json(
      { message: "Google authentication failed" },
      { status: 500 }
    );
  }
}
