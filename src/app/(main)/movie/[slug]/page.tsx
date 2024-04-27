import { db } from "@/lib/db";
import MovieDetails from "@/module/movie/MovieDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const movieId = Number(slug);

  if (Number.isNaN(movieId)) {
    return notFound();
  }

  const movie = await db.movie.findUnique({
    where: { id: movieId },
    include: {
      screenings: {
        select: { start_time: true },
      },
    },
  });

  if (!movie) {
    return notFound();
  }

  return (
    <section className="container flex flex-col">
      <MovieDetails movie={movie} />
    </section>
  );
};

export default Page;
