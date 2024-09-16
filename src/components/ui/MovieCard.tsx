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
      className="hover:scale-[100.5%] hover:shadow-lg transition-transform ease-in-out relative max-w-[300px] w-full mx-auto overflow-hidden border rounded-lg shadow-md"
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

      <div className="p-2">

        <h3 className="text-base font-semibold md:text-2xl line-clamp-1">{movie.title}</h3>
        <p className="mt-2">{
          movie.description.length > 100
            ? movie.description.slice(0, 100) + "..."
            : movie.description
        }</p>
      </div>
    </Link>
  );
};

export default MovieCard;
