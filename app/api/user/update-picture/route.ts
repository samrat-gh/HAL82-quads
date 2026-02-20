import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { profilePicture } = await req.json();

    if (!profilePicture) {
      return NextResponse.json(
        { error: "Profile picture URL is required" },
        { status: 400 },
      );
    }

    // Update user's profile picture
    await prisma.user.update({
      where: {
        userId: session.user.id,
      },
      data: {
        profilePicture,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { error: "Failed to update profile picture" },
      { status: 500 },
    );
  }
}
