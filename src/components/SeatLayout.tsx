"use client";

import React, { useState } from "react";

const SeatLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatIndex: number) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIndex));
      return;
    }
    if (!Boolean(selectedSeats.length < 6)) {
      return alert("maximum 6 seat");
    }
    setSelectedSeats([...selectedSeats, seatIndex]);
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h3 className=" border w-[300px] text-center">Screen</h3>
        <div className="grid grid-cols-10 sm:gap-2 gap-1 p-2 rounded-lg">
          {Array.from({ length: 64 }).map((_, index) => (
            <div
              key={index}
              className={`cursor-pointer border border-white/40 sm:h-12 sm:w-12 w-7 h-7 rounded-lg flex items-center justify-center ${
                selectedSeats.includes(index) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleSeatClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Details</h2>

        <p>Ticket Count: {selectedSeats.length}</p>
      </div>
    </div>
  );
};

export default SeatLayout;
