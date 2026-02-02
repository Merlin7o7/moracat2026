import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadFormSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadFormSchema.parse(body);

    // Check if email already on waitlist
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email: validatedData.email },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "This email is already on our waitlist!" },
        { status: 400 }
      );
    }

    // Create waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        numberOfCats: validatedData.numberOfPets,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for joining our waitlist! We'll be in touch soon.",
        id: entry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Validation failed" },
        { status: 400 }
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This could be used by admin to view waitlist count
  try {
    const count = await prisma.waitlistEntry.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Waitlist count error:", error);
    return NextResponse.json({ error: "Failed to get count" }, { status: 500 });
  }
}
