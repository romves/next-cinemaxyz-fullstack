import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { movieId, studioId, startTime } = await request.json();
  try {
    const movie = await db.movie.findUnique({ where: { id: movieId } });
    const studio = await db.studio.findUnique({ where: { id: studioId } });

    if (!movie || !studio) {
      return new Response("Movie or Studio not found", { status: 404 });
    }

    const newScreening = await db.screening.create({
      data: {
        start_time: new Date(startTime),
        movie: { connect: { id: movieId } },
        studio: { connect: { id: studioId } },
      },
    });

    return new Response(JSON.stringify(newScreening));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
