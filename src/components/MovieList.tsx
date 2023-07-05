import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieList = async () => {
  
  const movies = await db.movie.findMany();
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[100vw] gap-3 overflow-auto">
      {movies.map((movie) => (
        <Link
        href={`/movie/${movie.id}`}
          key={movie.id}
          className="border max-w-[240px] h-[420px] rounded-lg"
        >
          <div className="h-[350px]  overflow-hidden">
            <Image
              src={movie.poster_url}
              alt={movie.title}
              width={240}
              height={100}
            />
          </div>
          <h3>{movie.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
