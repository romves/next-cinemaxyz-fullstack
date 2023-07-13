import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MovieCard from "./ui/MovieCard";

const MovieList = async () => {
  const movies = await db.movie.findMany();
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit gap-3 overflow-auto py-2 px-1">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant="default"/>
      ))}
    </div>
  );
};

export default MovieList;
