import React from "react";
import type { Movie } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./badge";

type VariantType = "now-showing" | "default";

const MovieCard = ({
  movie,
  variant = "default",
}: {
  movie: Movie;
  variant?: VariantType;
}) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="relative w-full mx-auto overflow-hidden border rounded-lg shadow-md"
    >
      <div className="relative overflow-hidden h-[250px] md:h-[420px]">
        <Image
          className="object-cover"
          src={movie.poster_url}
          alt={movie.title}
          fill
        />
      </div>

      {variant === "now-showing" && (
        <Badge className="absolute bg-red-500 top-2 right-2">Now Showing</Badge>
      )}

      <h3 className="px-2 font-semibold md:text-lg text-md">{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;
