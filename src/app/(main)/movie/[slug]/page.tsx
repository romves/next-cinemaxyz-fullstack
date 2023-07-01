import { db } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: number;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  if (typeof Number(slug) !== "number" || isNaN(slug)) {
    return notFound(); // Handle the error when slug is not a number
  }

  const movie = await db.movie.findUnique({
    where: { id: Number(slug) },
  });

  if (!movie) {
    return notFound();
  }

  return (
    <div className="container flex flex-col border">
      <div className="flex gap-4 ">
        
        <Image
          src={movie.poster_url}
          alt={movie.title}
          width={350}
          height={0}
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">{movie.title}</h2>
          <p>{movie.description}</p>
          <span>Usia {movie.age_rating} tahun</span>
          <span>Release Date {movie.release_date.toLocaleDateString()}</span>
          <span>{movie.ticket_price}</span>
          <button className="btn btn-primary self-start">Beli Tiket</button>
        </div>
      </div>
    </div>
  );
};

export default page;
