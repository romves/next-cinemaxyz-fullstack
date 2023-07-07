"use client";

import { useFetchSession } from "@/lib/auth";
import { Movie, Screening, Studio } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SeatLayout from "./SeatLayout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/Select";
import { Button } from "./ui/Button";
import { useToast } from "@/hooks/use-toast";
import { SelectValue } from "@radix-ui/react-select";

interface BookDetailProps extends Movie {
  screenings: (Screening & { studio: Studio })[];
}

const BookDetail = ({ movie }: { movie: BookDetailProps }) => {
  const { toast } = useToast();
  const [selectedSeatsId, setSelectedSeatsId] = useState<number[]>([]);
  const [selectedScreeningId, setSelectedScreeningId] = useState<string>("");
  const { data: session } = useFetchSession();
  const router = useRouter();

  const { mutate: checkout } = useMutation({
    mutationFn: async () => {
      const payload = {
        screeningId: selectedScreeningId,
        movieId: movie.id,
        seatNumberArray: selectedSeatsId,
      };
      const { data } = await axios.post("/api/booking", payload);
      console.log(data);
    },
    onSuccess: () => {
      console.log("sukses cekout");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleCheckout = () => {
    if (selectedSeatsId.length === 0 || selectedScreeningId === "") {
      // Handle case when seats or screening are not selected

      return toast({
        title: "Something went wrong",
        description: "Fill all the required fields to continue!",
        variant: "destructive",
      });
    }

    const total = selectedSeatsId.length * movie.ticket_price;
    if (!session) {
      router.push("/");
      return;
    }
    if (session.balance < total) {
      router.push("/user/topup");
      return toast({
        title: "Something went wrong",
        description: "Insufficient balance!!!",
        variant: "destructive",
      });
    }
    checkout();
  };

  return (
    <div className="flex flex-col gap-2 items-center lg:items-start lg:flex-row lg:justify-center text-sm">
      <SeatLayout
        setSelectedSeatsId={setSelectedSeatsId}
        selectedSeatsId={selectedSeatsId}
      />

      <div className="max-w-[450px] border rounded-lg p-4 space-y-1 h-fit">
        <Select
          required
          onValueChange={(value) => setSelectedScreeningId(value)}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select studio" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {movie?.screenings.map((screening) => (
              <SelectItem key={screening.id} value={`${screening.id}`}>
                {screening.studio.name} |{" "}
                {screening.start_time.toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex justify-between">
          <p>Movie: </p>
          <span>{movie.title}</span>
        </div>
        <div className="flex justify-between">
          <p>Ticket Count: </p>
          <span>{selectedSeatsId.length}</span>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total Price: </p>
          <span>Rp.{selectedSeatsId.length * movie.ticket_price}</span>
        </div>
        <Button onClick={() => handleCheckout()} className="w-full">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default BookDetail;
