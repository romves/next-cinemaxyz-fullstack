import React from "react";
import type { Movie } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
    //   key={movie.id}
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
  );
};

export default MovieCard;
