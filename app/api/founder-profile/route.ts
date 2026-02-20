import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { calculateCompatibility } from "@/lib/compatibility";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
      include: { founderProfile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ profile: user.founderProfile });
  } catch (error) {
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

    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      productName,
      description,
      productUrl,
      startedDate,
      stage,
      lookingForSkill,
      commitmentRequired,
      riskAppetite,
      workSpeed,
      decisionStyle,
      ambitionLevel,
    } = body;

    const founderProfile = await prisma.founderProfile.upsert({
      where: { userId: user.id },
      update: {
        productName,
        description,
        productUrl,
        startedDate,
        stage,
        lookingForSkill,
        commitmentRequired,
        riskAppetite,
        workSpeed,
        decisionStyle,
        ambitionLevel,
      },
      create: {
        userId: user.id,
        productName,
        description,
        productUrl,
        startedDate,
        stage,
        lookingForSkill,
        commitmentRequired,
        riskAppetite,
        workSpeed,
        decisionStyle,
        ambitionLevel,
      },
    });

    const cofounderProfiles = await prisma.coFounderProfile.findMany();

    for (const cofounderProfile of cofounderProfiles) {
      const compatibility = calculateCompatibility(
        founderProfile,
        cofounderProfile,
      );

      await prisma.compatibility.upsert({
        where: {
          founderId_coFounderId: {
            founderId: founderProfile.id,
            coFounderId: cofounderProfile.id,
          },
        },
        update: {
          ...compatibility,
        },
        create: {
          founderId: founderProfile.id,
          coFounderId: cofounderProfile.id,
          ...compatibility,
        },
      });
    }

    return NextResponse.json({
      message: "Profile saved successfully",
      profile: founderProfile,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
