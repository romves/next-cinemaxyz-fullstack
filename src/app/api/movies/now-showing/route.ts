import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const currentDateTime = new Date();

    const nowScreeningMovies = await db.screening.findMany({
      where: {
        start_time: {
          gte: currentDateTime,
        },
      },
      distinct: ["movie_id"],
      select: {
        start_time: true,
        studio: {
          select: {
            name: true,
          },
        },
        movie: true,
      },
    });

    const movies = nowScreeningMovies.map((screening) => screening.movie);

    return new Response(JSON.stringify(movies));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
