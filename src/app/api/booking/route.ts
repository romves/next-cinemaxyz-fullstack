import { db } from "@/lib/db";

interface BookingRequest {
  screeningId: string;
  movieId: string;
  seatNumberArray: number[];
}

export async function POST(request: Request) {
  const { screeningId, movieId, seatNumberArray } =
    (await request.json()) as BookingRequest;
  const userId = request.headers.get("userid");

  try {
    if (!userId) {
      return new Response("User not found", { status: 404 });
    }

    const parsedMovieId = parseInt(movieId);
    const parsedScreeningId = parseInt(screeningId);
    const parsedUserId = parseInt(userId);

    if (
      isNaN(parsedMovieId) ||
      isNaN(parsedScreeningId) ||
      isNaN(parsedUserId)
    ) {
      return new Response("Invalid input", { status: 400 });
    }

    const movie = await db.movie.findUnique({
      where: { id: parseInt(movieId) },
    });
    const screening = await db.screening.findUnique({
      where: { id: parseInt(screeningId) },
      include: { movie: true },
    });
    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
    });
    const existingSeats = await db.seat.findMany({
      where: { seatNumber: { in: seatNumberArray } },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    if (!movie || !screening) {
      return new Response("Movie or Screening not found", { status: 404 });
    }

    if (user.age < movie.age_rating) {
      return new Response("Underaged", { status: 400 });
    }

    const totalPrice = seatNumberArray.length * movie.ticket_price;

    if (user.balance < totalPrice) {
      return new Response("Insufficient balance", { status: 400 });
    }
    if (existingSeats.length > 0) {
      return new Response("Some seats are not available", { status: 404 });
    }

    const createdSeats = await Promise.all(
      seatNumberArray.map((seatNumber) =>
        db.seat.create({
          data: {
            seatNumber: seatNumber,
            studio: { connect: { id: screening.studioId } },
          },
        })
      )
    );

    const booking = await db.booking.create({
      data: {
        user: { connect: { id: parsedUserId } },
        tickets: {
          create: createdSeats.map((seat) => ({
            seat: { connect: { id: seat.id } },
            movie: { connect: { id: parsedMovieId } },
            screening: { connect: { id: parsedScreeningId } },
            user: { connect: { id: user.id } },
          })),
        },
      },
      include: { tickets: { include: { seat: true, movie: true, screening: true  } } },
    });

    await db.user.update({
      where: { id: user.id },
      data: { balance: user.balance - totalPrice },
    });

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error));
  }
}