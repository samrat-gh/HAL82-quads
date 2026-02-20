import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by userId field
    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: user.profile });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      websiteUrl,
      socialTwitter,
      socialLinkedIn,
      socialGithub,
      socialInstagram,
      currentUsers,
      monthlyTraffic,
      monthlyRevenue,
    } = body;

    // Find user by userId field to get their ObjectId
    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Upsert profile (create or update)
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        websiteUrl: websiteUrl || null,
        socialTwitter: socialTwitter || null,
        socialLinkedIn: socialLinkedIn || null,
        socialGithub: socialGithub || null,
        socialInstagram: socialInstagram || null,
        currentUsers: currentUsers ? Number.parseInt(currentUsers) : null,
        monthlyTraffic: monthlyTraffic ? Number.parseInt(monthlyTraffic) : null,
        monthlyRevenue: monthlyRevenue
          ? Number.parseFloat(monthlyRevenue)
          : null,
      },
      create: {
        userId: user.id,
        websiteUrl: websiteUrl || null,
        socialTwitter: socialTwitter || null,
        socialLinkedIn: socialLinkedIn || null,
        socialGithub: socialGithub || null,
        socialInstagram: socialInstagram || null,
        currentUsers: currentUsers ? Number.parseInt(currentUsers) : null,
        monthlyTraffic: monthlyTraffic ? Number.parseInt(monthlyTraffic) : null,
        monthlyRevenue: monthlyRevenue
          ? Number.parseFloat(monthlyRevenue)
          : null,
      },
    });

    return NextResponse.json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile save error:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
