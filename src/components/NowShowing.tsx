import { Movie } from "@prisma/client";
import MovieCard from "./ui/MovieCard";

const NowShowing = async () => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    }/api/movies/now-showing`
  );
  const movies = await res.json();

  if (!movies || movies.length == 0) return <section>Movies not found</section>;

  return (
    <div className="flex gap-3 overflow-auto py-2">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} variant="now-showing" />
      ))}
    </div>
  );
};

export default NowShowing;
