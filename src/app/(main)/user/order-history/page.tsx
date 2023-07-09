"use client";

import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import {
  Booking,
  Movie,
  Screening,
  Seat,
  Studio,
  Ticket,
} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ScreeningType extends Screening {
  studio: Studio;
}

interface TicketType extends Ticket {
  movie: Movie;
  screening: ScreeningType;
  seat: Seat;
}

interface OrderHistoryType extends Booking {
  tickets: TicketType[];
}

const Page = () => {
  const { data: orderHistory, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/user/order-history");

      return response.data as OrderHistoryType[];
    },
    queryKey: ["order-history"],
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  if (orderHistory == undefined) return <div>No Orders</div>;

  return (
    <UserInfoLayout className=" flex flex-col gap-2 p-2">
      {orderHistory?.map((order) => (
        <div
          className="flex flex-col border h-fit p-2 rounded-lg"
          key={order.id}
        >
          <h3 className="font-bold">
            Order ID: {order.id} | {order.checkoutDate.toLocaleString()}
          </h3>
          <ul className="space-y-2">
            {order.tickets.map((ticket) => (
              <div key={ticket.id} className="flex gap-2">
                <div className="w-[95px] rounded-sm overflow-hidden">
                  <Image
                    src={ticket.movie.poster_url}
                    alt={ticket.movie.title}
                    width={100}
                    height={100}
                  />
                </div>
                <li className="flex flex-col">
                  <p>Movie: {ticket.movie.title}</p>
                  <p>At: {ticket.screening.studio.name}</p>
                  <p>Date: {ticket.screening.start_time.toLocaleString()}</p>
                  <p>Seat Number: {ticket.seat.seatNumber}</p>
                </li>
              </div>
            ))}
            <Button className="mt-auto w-fit">Cancel Order</Button>
          </ul>
        </div>
      ))}
    </UserInfoLayout>
  );
};

export default Page;
