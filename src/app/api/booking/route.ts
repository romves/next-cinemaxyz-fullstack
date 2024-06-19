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

    const [movie, screening, user] = await Promise.all([
      db.movie.findUnique({ where: { id: parsedMovieId } }),
      db.screening.findUnique({ where: { id: parsedScreeningId } }),
      db.user.findUnique({ where: { id: parsedUserId } }),
    ]);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    if (!movie || !screening) {
      return new Response("Movie or Screening not found", { status: 404 });
    }

    const existingSeats = await db.seat.findMany({
      where: {
        tickets: {
          some: {
            screening: {
              id: parsedScreeningId,
            },
          },
        },
        seatNumber: {
          in: seatNumberArray,
        },
      },
      select: {
        seatNumber: true,
      },
    });

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

    const createdSeats = [];

    for (const seatNumber of seatNumberArray) {
      const createdSeat = await db.seat.create({
        data: {
          seatNumber: seatNumber,
          studio: { connect: { id: screening.studio_id } },
        },
      });

      createdSeats.push(createdSeat);
    }

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
        total_booking: totalPrice,
      },
    });

    await db.user.update({
      where: { id: user.id },
      data: { balance: user.balance - totalPrice },
    });

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { data } = await request.json()
  const bookingId = data.bookingId
  const userId = request.headers.get("userid");

  try {
    if (!userId) {
      return new Response("User not found", { status: 404 });
    }

    const parsedBookingId = parseInt(bookingId);
    const parsedUserId = parseInt(userId);

    const user = await db.user.findUnique({ where: { id: parsedUserId } })

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (isNaN(parsedBookingId) || isNaN(parsedUserId)) {
      return new Response("Invalid input", { status: 400 });
    }

    const booking = await db.booking.findUnique({
      where: { id: parsedBookingId },
      include: { tickets: { include: { seat: true } } },
    });

    if (!booking) {
      return new Response("Booking not found", { status: 404 });
    }

    if (booking.user_id !== parsedUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const ticketIds = booking.tickets.map((ticket) => ticket.id);
    const seatIds = booking.tickets.map((ticket) => ticket.seat.id);

    const screening = await db.screening.findUnique({ where: { id: booking.tickets[0].screening_id } });

    if (!screening) {
      return new Response('Screening not found', { status: 404 });
    }

    const currentDateTime = new Date();
    const screeningDateTime = new Date(screening.start_time);
    
    if (screeningDateTime <= currentDateTime) {
      return new Response('Movie is already showing', { status: 400 });
    }

    await db.booking.delete({ where: { id: parsedBookingId } });
    await db.ticket.deleteMany({ where: { id: { in: ticketIds } } });
    await db.seat.deleteMany({ where: { id: { in: seatIds } } });

    await db.user.update({
      where: { id: user.id },
      data: { balance: user.balance + booking.total_booking },
    });

    return new Response("Booking canceled successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
}
