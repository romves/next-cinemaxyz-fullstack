"use client";

import { useTicketBookingStore } from "@/store/authStore";
import { Dispatch, SetStateAction } from "react";

interface SeatLayoutProps {
  selectedSeatsId: number[];
  setSelectedSeatsId: Dispatch<SetStateAction<number[]>>;
}

const SeatLayout = ({ selectedSeatsId, setSelectedSeatsId }: SeatLayoutProps) => {
  const { availableSeatsId } = useTicketBookingStore((state) => state);

  const handleSeatClick = (seatIndex: number) => {
    if (availableSeatsId.includes(seatIndex)) {
      return; // Seat is already booked, do not allow selection
    }
    if (selectedSeatsId.includes(seatIndex)) {
      setSelectedSeatsId(selectedSeatsId.filter((seat) => seat !== seatIndex));
      return;
    }
    if (selectedSeatsId.length >= 6) {
      return alert("Maximum 6 seats can be selected.");
    }

    const newSelectedSeatsId = [...selectedSeatsId, seatIndex];
    setSelectedSeatsId(newSelectedSeatsId);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className=" border w-[300px] text-center">Screen</h3>
      <div className="grid grid-cols-10 sm:gap-2 gap-1 p-2 rounded-lg">
        {Array.from({ length: 64 }).map((_, index) => (
          <div
            key={index}
            className={`${
              availableSeatsId.includes(index)
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } border border-white/40 sm:h-12 sm:w-12 w-7 h-7 rounded-lg flex items-center justify-center ${
              selectedSeatsId.includes(index) ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleSeatClick(index)}
          >
            {availableSeatsId.includes(index) ? "sold" : index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatLayout;
