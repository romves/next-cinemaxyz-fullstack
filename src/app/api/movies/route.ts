import { db } from "@/lib/db";
import type { Movie } from "@prisma/client";

export async function POST(request: Request) {
  const {
    title,
    description,
    release_date: releaseDateStr,
    poster_url,
    age_rating,
    ticket_price,
  }: Movie = await request.json();
  const releaseDate = new Date(releaseDateStr);
  try {
    const newMovie = await db.movie.create({
      data: {
        title,
        description,
        release_date: releaseDate,
        poster_url,
        age_rating,
        ticket_price,
      },
    });
    return new Response(JSON.stringify(newMovie));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const movies = await db.movie.findMany();
    return new Response(JSON.stringify(movies));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
