"use client";

import { useFetchSession } from "@/lib/auth";
import type { Movie, Screening } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TicketBookButtonProps extends Movie {
  screenings: { start_time: Date }[];
}

const TicketBookButton = ({ movie }: { movie: TicketBookButtonProps }) => {
  const router = useRouter();
  const { data: session } = useFetchSession();

  const handleBook = () => {
    if (!session) {
      return;
    }

    if (!movie.screenings || movie.screenings.length === 0) {
      alert("movie not showing");
      return;
    }

    if (session.age <= movie.age_rating) {
      alert("Belum cukup umur");
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
