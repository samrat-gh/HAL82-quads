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

    const user = await prisma.user.findUnique({
      where: { userId: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, company, description, startDate, endDate, isCurrent } = body;

    if (!title || !company || !startDate) {
      return NextResponse.json(
        { error: "Title, company, and start date are required" },
        { status: 400 },
      );
    }

    const experience = await prisma.experience.create({
      data: {
        userId: user.id,
        title,
        company,
        description: description || null,
        startDate,
        endDate: isCurrent ? null : endDate,
        isCurrent: isCurrent || false,
      },
    });

    return NextResponse.json({ experience });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 },
    );
  }
}
