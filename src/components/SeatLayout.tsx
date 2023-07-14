"use client";

import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SeatLayoutProps {
  screeningId: string;
  selectedSeatsId: number[];
  setSelectedSeatsId: Dispatch<SetStateAction<number[]>>;
}

const SeatLayout = ({
  screeningId,
  selectedSeatsId,
  setSelectedSeatsId,
}: SeatLayoutProps) => {
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (screeningId) {
      const getAvailableSeat = async () => {
        setIsLoading(true);
        const response = await axiosInstance.post("/booking/available-seats", {
          screeningId: Number(screeningId),
        });

        setBookedSeats(response.data);
        setIsLoading(false);
      };
      getAvailableSeat();
    }
  }, [screeningId]);

  if (!screeningId) return <></>;

  const handleSeatClick = (seatIndex: number) => {
    if (bookedSeats.includes(seatIndex)) {
      return; // Seat is already booked, do not allow selection
    }
    if (selectedSeatsId.includes(seatIndex)) {
      setSelectedSeatsId(selectedSeatsId.filter((seat) => seat !== seatIndex));
      return;
    }
    if (selectedSeatsId.length >= 6) {
      return toast({
        title: "Error",
        description: "Maximum 6 seats can be selected.",
        variant: "destructive",
      });
    }

    const newSelectedSeatsId = [...selectedSeatsId, seatIndex];
    setSelectedSeatsId(newSelectedSeatsId);
  };

  return (
    <div className="border w-fit p-2 rounded-lg flex flex-col items-center gap-2">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <h3 className=" border w-[300px] text-center">Screen</h3>
          <div className="grid grid-cols-10 sm:gap-2 gap-1 p-2 rounded-lg">
            {Array.from({ length: 64 }).map((_, index) => (
              <div
                key={index}
                className={`${
                  bookedSeats.includes(index + 1)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } border shadow-sm sm:h-12 sm:w-12 text-xs sm:text-base w-7 h-7 rounded-lg flex items-center justify-center ${
                  bookedSeats.includes(index + 1) ? "sold" : "hover:bg-neutral-200"
                } ${
                  selectedSeatsId.includes(index + 1)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleSeatClick(index + 1)}
              >
                {bookedSeats.includes(index + 1) ? "sold" : index + 1}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SeatLayout;
