import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!["founder", "cofounder", "investor"].includes(role.toLowerCase())) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = randomUUID();

    const user = await prisma.user.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role.toLowerCase(),
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
