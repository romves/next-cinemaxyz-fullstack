import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { topupAmount } = await request.json();
  const userId = request.headers.get("userid");

  if (!userId) return new Response("Unauthenticated", { status: 401 });

  const user = await db.user.findUnique({
    where: { id: parseInt(userId) },
  });

  if (!user) return new Response("User not found", { status: 404 });

  try {
    await db.user.update({
      where: { id: user.id },
      data: { balance: user.balance + topupAmount },
    });

    return new Response("Topup success");
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
