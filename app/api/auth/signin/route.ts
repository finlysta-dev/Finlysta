import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

try {

const { email, password } = await req.json();

if (!email || !password) {
return NextResponse.json(
{ error: "Email and password required" },
{ status: 400 }
);
}

const user = await prisma.user.findUnique({
where: { email }
});

if (!user || !user.password) {
return NextResponse.json(
{ error: "Invalid email or password" },
{ status: 401 }
);
}

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {
return NextResponse.json(
{ error: "Invalid email or password" },
{ status: 401 }
);
}

/* BAN CHECK */

if (user.isBanned) {
return NextResponse.json(
{
error: "Your account is banned. Contact support."
},
{ status: 403 }
);
}

return NextResponse.json({
success: true,
user: {
id: user.id,
name: user.name,
email: user.email
}
});

} catch (error) {

console.error("Signin error:", error);

return NextResponse.json(
{ error: "Server error" },
{ status: 500 }
);

}

}
