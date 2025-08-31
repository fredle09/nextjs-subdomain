import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Mock logout - in a real app you would invalidate tokens
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}
