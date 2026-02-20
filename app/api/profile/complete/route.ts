import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      profilePicture,
      bio,
      location,
      phoneNumber,
      yearsOfExperience,
      websiteUrl,
      socialLinkedIn,
      socialTwitter,
      socialGithub,
      experiences,
    } = body;

    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields
    await prisma.user.update({
      where: { userId: session.user.id },
      data: {
        profilePicture,
        bio,
        location,
        phoneNumber: phoneNumber || null,
        yearsOfExperience: yearsOfExperience ? Number(yearsOfExperience) : null,
        profileCompleted: true,
      },
    });

    // Upsert profile with website and social links (only if at least one field is provided)
    if (websiteUrl || socialLinkedIn || socialTwitter || socialGithub) {
      await prisma.profile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          websiteUrl: websiteUrl || null,
          socialLinkedIn: socialLinkedIn || null,
          socialTwitter: socialTwitter || null,
          socialGithub: socialGithub || null,
        },
        update: {
          websiteUrl: websiteUrl || null,
          socialLinkedIn: socialLinkedIn || null,
          socialTwitter: socialTwitter || null,
          socialGithub: socialGithub || null,
        },
      });
    }

    if (experiences && experiences.length > 0) {
      await prisma.experience.deleteMany({
        where: { userId: user.id },
      });

      await prisma.experience.createMany({
        data: experiences.map(
          (exp: {
            title: string;
            company: string;
            description: string;
            startDate: string;
            endDate: string;
            isCurrent: boolean;
          }) => ({
            userId: user.id,
            title: exp.title,
            company: exp.company,
            description: exp.description || "",
            startDate: exp.startDate,
            endDate: exp.endDate || null,
            isCurrent: exp.isCurrent,
          }),
        ),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile completion error:", error);
    return NextResponse.json(
      {
        error: "Failed to complete profile",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
