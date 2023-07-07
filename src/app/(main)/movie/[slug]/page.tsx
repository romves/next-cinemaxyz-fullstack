import TicketBookButton from "@/components/TicketBookButton";
import { db } from "@/lib/db";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

interface PageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const movieId = Number(slug);

  if (Number.isNaN(movieId)) {
    return notFound(); // Handle the error when slug is not a number
  }

  const movie = await db.movie.findUnique({
    where: { id: movieId },
    include: {
      screenings: {
        select: { start_time: true },
      },
    },
  });

  if (!movie) {
    return notFound();
  }

  return (
    <div className="container flex flex-col py-8">
      <div className="flex flex-col items-center md:flex-row gap-4">
        <Image
          className="rounded-lg "
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
          <span>Rp.{movie.ticket_price}</span>

          {/* TODO Check Session and Age before directing to next step */}

          <TicketBookButton movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default Page;
