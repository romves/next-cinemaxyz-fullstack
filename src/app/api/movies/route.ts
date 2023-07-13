import { db } from "@/lib/db";
import type { Movie } from "@prisma/client";
import { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const movie = await db.movie.findUnique({
        where: { id: parseInt(id) },
        include: {
          screenings: {
            include: {
              studio: true,
            },
          },
        },
      });

      return new Response(JSON.stringify(movie));
    }

    const movies = await db.movie.findMany();
    return new Response(JSON.stringify(movies));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
