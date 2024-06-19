import { db } from "@/lib/db";
import { Booking, Ticket } from "@prisma/client";

export async function GET(request: Request) {
  const userId = request.headers.get("userid");

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const orderHistory = await db.booking.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        tickets: {
          include: {
            seat: true,
            movie: true,
            screening: { include: { studio: true } },
          },
        },
      },
    });

    return new Response(JSON.stringify(orderHistory));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}