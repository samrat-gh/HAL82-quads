import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    // Verify the experience belongs to the user
    const existingExp = await prisma.experience.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingExp) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: {
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
      { error: "Failed to update experience" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    // Verify the experience belongs to the user
    const existingExp = await prisma.experience.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingExp) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 },
    );
  }
}
