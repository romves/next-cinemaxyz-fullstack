import { axiosInstance } from "@/common/config/axios";
import { Movie } from "@prisma/client";
import React from "react";
import MovieCard from "../../../../components/ui/MovieCard";
import { Loader2 } from "lucide-react";

const NowShowing = async () => {
  // const { data: movies } = await fetchMovies();

  return <section>Movies not found</section>;

  // return (
  //   <div className="flex gap-3 py-2 overflow-auto">
  //     {movies?.map((movie: Movie) => (
  //       <MovieCard key={movie.id} movie={movie} variant="now-showing" />
  //     ))}
  //   </div>
  // );
};

export default NowShowing;
