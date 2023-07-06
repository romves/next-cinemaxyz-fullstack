"use client";

import { useFetchSession } from "@/lib/auth";
import { Movie, Screening, Studio } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SeatLayout from "./SeatLayout";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

interface BookDetailProps extends Movie {
  screenings: (Screening & { studio: Studio })[];
}

const BookDetail = ({ movie }: { movie: BookDetailProps }) => {
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
      alert("ISI DULU");
      return;
    }

    const total = selectedSeatsId.length * movie.ticket_price;
    if (!session) {
      router.push("/");
      return;
    }
    if (session.balance < total) {
      alert("duit habis");
      router.push("/user/topup");
      return;
    }
    checkout();
  };

  return (
    <div>
      <select
        defaultValue=""
        onChange={(e) => setSelectedScreeningId(e.target.value)}
      >
        <option disabled value="" hidden>
          Select Studio
        </option>
        {movie?.screenings.map((screening) => (
          <option key={screening.id} value={screening.id}>
            {screening.studio.name}
          </option>
        ))}
      </select>
      <SeatLayout
        setSelectedSeatsId={setSelectedSeatsId}
        selectedSeatsId={selectedSeatsId}
      />

      <div>
        <h2>Details</h2>
        <p>Ticket Count: {selectedSeatsId.length}</p>
        <p>Total Price: {selectedSeatsId.length * movie.ticket_price}</p>
      </div>

      <button onClick={() => handleCheckout()} className="btn btn-primary">
        Checkout
      </button>
    </div>
  );
};

export default BookDetail;
