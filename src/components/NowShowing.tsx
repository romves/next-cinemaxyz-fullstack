"use client";

import { axiosInstance } from "@/lib/axios";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MovieCard from "./ui/MovieCard";

const NowShowing = () => {
  const { data: movies, isLoading } = useQuery({
    queryFn: async () => {
      const nowShowingMovie = await axiosInstance.get("/movies/now-showing");

      return nowShowingMovie.data;
    },
    queryKey: ["now-showing"],
  });

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="flex max-w-[100vw] gap-3 overflow-auto">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default NowShowing;
