import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response("Invalid email or password", { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response("Invalid email or password", { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, "secretnihbos", {
      expiresIn: "10h",
    });
    return new Response(JSON.stringify(token));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
