import { db } from "@/lib/db";

export async function POST(request: Request) {
  const arrayMovie = await request.json();

  try {
    for (const movie of arrayMovie) {
      const id = movie.id;
      const title = movie.title;
      const description = movie.description;
      const releaseDate = new Date(movie.release_date); 
      const posterUrl = movie.poster_url;
      const ageRating = movie.age_rating;
      const ticketPrice = movie.ticket_price;
      const newMovie = await db.movie.create({
        data: {
          title,
          description,
          release_date: releaseDate,
          poster_url: posterUrl,
          age_rating: ageRating,
          ticket_price: ticketPrice,
        },
      });
     
    }
    return new Response(JSON.stringify("SUDAH ALL"));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
