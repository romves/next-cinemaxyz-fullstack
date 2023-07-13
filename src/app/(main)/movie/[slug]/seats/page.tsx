'use client'

import BookDetail from "@/components/BookDetail";
import { axiosInstance } from "@/lib/axios";
import withAuth from '@/components/hoc/withAuth'
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

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

  if(isLoading) return <div>Loading..</div>

  return (
    <div className="container lg:border lg:shadow-md rounded-lg py-8 my-4  space-y-4">
      <h2 className="font-bold text-3xl">Fill up the details</h2>
      <BookDetail movie={movie!} />
    </div>
  );
};

export default withAuth(Page);
