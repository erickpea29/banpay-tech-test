import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export const runtime = "edge";

export default async function POST(request: NextRequest) {
  try {
    const { filmId, userId } = await request.json();
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const currentFavorites: string[] = Array.isArray(
      user.publicMetadata?.favorites
    )
      ? user.publicMetadata.favorites
      : [];

    if (currentFavorites.includes(filmId)) {
      return NextResponse.json({
        success: false,
        message: "Film already in favorites",
      });
    }

    const updatedFavorites = [...currentFavorites, filmId];

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        favorites: updatedFavorites,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
    return NextResponse.json({
      success: false,
      message: "An unknown error occurred",
    });
  }
}
