'use client'

import { axiosInstance } from "@/lib/axios";
import withAuth from '@/components/hoc/withAuth'
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import MovieBookDetail from "@/module/movie/MovieBookDetail";

interface PageProps {
  params: {
    slug: number;
  };
}

const Page = ({ params }: PageProps) => {
  const { slug } = params;
  const movieId = Number(slug);

  const { data: movie, isLoading } = useQuery({
    queryFn: async () => {
      if (Number.isNaN(movieId)) {
        return notFound();
      }

      const response = await axiosInstance.get(`/movies?id=${movieId}`);

      return response.data ;
    },
    queryKey: [`movie-${movieId}`],
  });

  if(isLoading) return;

  return (
    <section className="container py-8 my-4 space-y-8">
      <h2 className="font-bold text-3xl">Fill up the details</h2>
      {/* <BookDetail movie={movie!} /> */}
      <MovieBookDetail movie={movie!} />
    </section>
  );
};

export default withAuth(Page);
