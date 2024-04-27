"use client";

import { useFetchSession } from "@/lib/auth";
import type { Movie, Screening } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { useToast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface TicketBookButtonProps extends Movie {
  screenings: { start_time: Date }[];
}

const TicketBookButton = ({ movie }: { movie: TicketBookButtonProps }) => {
  const { toast } = useToast();
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const { data: session } = useFetchSession();

  const handleBook = () => {
    if (!session) {
      return loginToast();
    }

    if (!movie.screenings || movie.screenings.length === 0) {
      return toast({
        title: "Error",
        description: "Movie is not currently showing",
        variant: "destructive",
      });
    }

    if (session.age <= movie.age_rating) {
      return toast({
        title: "Error",
        description: "Age requirement does not met",
        variant: "destructive",
      });
    }

    router.push(`${movie.id}/seats`);
  };

  return (
    <Button onClick={handleBook} className="btn btn-primary self-start">
      Book Ticket
    </Button>
  );
};

export default TicketBookButton;
