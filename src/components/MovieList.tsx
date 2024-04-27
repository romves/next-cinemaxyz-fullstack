import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MovieCard from "./ui/MovieCard";

const MovieList = async () => {
  const movies = await db.movie.findMany();
  
  return (
    <div className="flex flex-wrap justify-start w-fit gap-3 overflow-auto py-2 px-1">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant="default"/>
      ))}
    </div>
  );
};

export default MovieList;
