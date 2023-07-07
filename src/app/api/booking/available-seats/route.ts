import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { screeningId } = await request.json();

  try {
    const screening = await db.screening.findUnique({
      where: {
        id: parseInt(screeningId),
      },
    });

    if (!screening) return new Response("Screening not found", { status: 404 });

    const occupiedSeats = await db.seat.findMany({
      where: {
        tickets: {
          some: {
            screeningId: parseInt(screeningId),
          },
        },
      },
    });

    if (!occupiedSeats) return new Response(JSON.stringify([]));

    const occupiedSeatNumbers = occupiedSeats.map((seat) => seat.seatNumber);

    return new Response(JSON.stringify(occupiedSeatNumbers));
  } catch (error) {
    console.log(error)
    return new Response("Internal server error", { status: 500 });
  }
}
