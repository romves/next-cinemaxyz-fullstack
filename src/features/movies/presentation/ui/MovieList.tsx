import { db } from "@/common/config/db";
import MovieCard from "../../../../components/ui/MovieCard";

const MovieList = async () => {
  const movies = await db.movie.findMany();
  
  return (
    <div className="flex flex-wrap justify-start gap-3 px-1 py-2 overflow-auto w-fit">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant="default"/>
      ))}
    </div>
  );
};

export default MovieList;
