import { db } from "@/lib/db";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const { fullname, age, username, password } = await request.json();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { fullname, username, password: hashedPassword, age, balance: 0},
    });
    return new Response(JSON.stringify(user))
  } catch (error) {
    return new Response("Internal server error", {status: 500})
  }
}
