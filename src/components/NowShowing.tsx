"use client";

import { axiosInstance } from "@/lib/axios";
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MovieCard from "./ui/MovieCard";
import { Loader2 } from 'lucide-react';

const NowShowing = () => {
  const { data: movies, isLoading } = useQuery({
    queryFn: async () => {
      const nowShowingMovie = await axiosInstance.get("/movies/now-showing");

      return nowShowingMovie.data;
    },
    queryKey: ["now-showing"],
  });

  if (isLoading) {
    return <Loader2 className="animate-spin"/>;
  }
  return (
    <div className="flex max-w-[100vw] gap-3 overflow-auto py-2">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default NowShowing;
