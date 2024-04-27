import TicketBookButton from "@/components/TicketBookButton";
import { currencyFormatter, dateFormatter } from "@/lib/utils";
import { Movie, Screening } from "@prisma/client";
import Image from "next/image";
import React from "react";

export default function MovieDetails({
  movie,
}: {
  movie: Movie & { screenings: { start_time: Date }[] };
}) {
  return (
    <div className="flex flex-row gap-8">
      <Image
        className="rounded-lg "
        src={movie.poster_url}
        alt={movie.title}
        width={350}
        height={0}
        quality={75}
      />

      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">{movie.title}</h2>
        <p>{movie.description}</p>
        <div>
          <p className="text-xs">Age</p>
          <p>{movie.age_rating}+</p>
        </div>
        <div>
          <p className="text-xs">Release Date</p>
          <p>{dateFormatter(movie.release_date.toISOString())}</p>
        </div>
        <div>
          <p className="text-xs">Ticket Price</p>
          <p>{currencyFormatter(movie.ticket_price)}</p>
        </div>

        <TicketBookButton movie={movie} />
      </div>
    </div>
  );
}
