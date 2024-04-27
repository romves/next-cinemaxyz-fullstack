import { axiosInstance } from "@/lib/axios";
import { Movie } from "@prisma/client";
import React from "react";
import MovieCard from "./ui/MovieCard";
import { Loader2 } from "lucide-react";
import { fetchMovies } from "@/service/movies";

const NowShowing = async () => {
  const { data: movies } = await fetchMovies();

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
