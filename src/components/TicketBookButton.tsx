"use client";

import { useFetchSession } from "@/lib/auth";
import type { Movie } from "@prisma/client";
import { useRouter } from "next/navigation";

interface User {
  fullname: string;
  username: string;
  age: number;
  balance: number;
}

const TicketBookButton = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const { data: session } = useFetchSession();

  const handleBook = () => {
    if (!session) {
      return;
    }

    router.push(`${movie.id}/seats`);
  };

  return (
    <button onClick={handleBook} className="btn btn-primary self-start">
      Beli Tiket
    </button>
  );
};

export default TicketBookButton;
