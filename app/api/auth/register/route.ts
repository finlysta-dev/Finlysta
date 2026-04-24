import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7B05E', '#6C5B7B', '#F08A5D',
    '#B83B5E', '#2F5D62', '#5E8B7E', '#A7C4BC', '#DF5E5E',
    '#2C3A47', '#D6A2A2', '#6C9EBF', '#E8A87C', '#C38D9E'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Generate initials from name
function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Generate a random avatar using UI Avatars API
function getRandomAvatar(name: string): string {
  const color = getAvatarColor(name).replace('#', '');
  const initials = getInitials(name);
  return `https://ui-avatars.com/api/?name=${initials}&background=${color}&color=fff&bold=true&size=128&rounded=true`;
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate avatar for email/password user
    const generatedAvatar = getRandomAvatar(name);

    // Create user with avatar
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        image: generatedAvatar, // Store generated avatar
      },
    });

    // Send welcome email (non-blocking - don't fail registration if email fails)
    try {
      const userEmail = user.email;
      const userName = user.name || name || "User";
      
      if (userEmail) {
        // Use Promise.resolve to handle async email sending without awaiting
        Promise.resolve(sendWelcomeEmail(userEmail, userName))
          .then(() => console.log("Welcome email sent to:", userEmail))
          .catch((emailErr) => console.error("Email sending failed:", emailErr));
      }
    } catch (emailErr) {
      // Just log, don't fail the registration
      console.error("Email error (non-blocking):", emailErr);
    }

    // Return success with user data including avatar
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image, // Return the generated avatar
      },
    });

  } catch (error) {
    console.error("Register error details:", error);
    
    // Return specific error message
    return NextResponse.json(
      { 
        error: "Registration failed. Please try again.",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
