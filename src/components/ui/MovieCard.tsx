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

      {variant === "now-showing" && (
        <Badge className="absolute top-2 right-2 bg-red-500">Now Showing</Badge>
      )}

      <h3 className="px-2 text-lg font-semibold">{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;
