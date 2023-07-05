import SeatLayout from "@/components/SeatLayout";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: number;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const movieId = Number(slug);

  if (Number.isNaN(movieId)) {
    return notFound(); // Handle the error when slug is not a number
  }

  const movie = await db.movie.findUnique({
    where: { id: movieId },
    include: {
      screenings: {
        include: {
          studio: true,
        },
      },
    },
  });

  return (
    <div className="container border">
      <h1>Select Studio</h1>
      <select defaultValue="">
        <option disabled value="" hidden>Select Studio</option>
        {movie?.screenings.map((screening) => (
          <option key={screening.id}>{screening.studio.name}</option>
        ))}
      </select>

      <SeatLayout />
    </div>
  );
};

export default page;
