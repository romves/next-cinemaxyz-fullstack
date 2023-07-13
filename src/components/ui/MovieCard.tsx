import React from "react";
import type { Movie } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

type VariantType = 'now-showing' | 'default';

const MovieCard = ({ movie, variant = "default" }: { movie: Movie, variant?: VariantType }) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="relative border max-w-[240px] min-w-[240px] h-[420px] rounded-lg overflow-hidden shadow-md"
    >
      <div className="h-[350px]  overflow-hidden">
        <Image
          src={movie.poster_url}
          alt={movie.title}
          width={240}
          height={100}
        />
      </div>

      {variant === "now-showing" && <div className="absolute bg-red-600 h-6 top-0 right-0 text-white px-2 rounded-es-sm">Now Showing</div>}
      
      <h3 className="px-2 text-lg font-semibold">{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;
