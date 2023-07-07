import BookDetail from "@/components/BookDetail";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: number;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const movieId = Number(slug);

  if (Number.isNaN(movieId)) {
    return notFound();
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
    <div className="container lg:border lg:shadow-md rounded-lg py-8 my-4  space-y-4">
      <h2 className="font-bold text-3xl">Fill up the details</h2>
      <BookDetail movie={movie!}/>
    </div>
  );
};

export default page;
