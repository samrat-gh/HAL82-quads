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

    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
      include: {
        founderProfile: true,
        cofounderProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.founderProfile) {
      const matches = await prisma.compatibility.findMany({
        where: { founderId: user.founderProfile.id },
        include: {
          coFounder: {
            include: {
              user: {
                select: {
                  userId: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  profilePicture: true,
                },
              },
            },
          },
        },
        orderBy: { totalScore: "desc" },
      });

      return NextResponse.json({ matches, role: "founder" });
    }

    if (user.cofounderProfile) {
      const matches = await prisma.compatibility.findMany({
        where: { coFounderId: user.cofounderProfile.id },
        include: {
          founder: {
            include: {
              user: {
                select: {
                  userId: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  profilePicture: true,
                },
              },
            },
          },
        },
        orderBy: { totalScore: "desc" },
      });

      return NextResponse.json({ matches, role: "cofounder" });
    }

    return NextResponse.json({ matches: [], role: user.role });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 },
    );
  }
}
