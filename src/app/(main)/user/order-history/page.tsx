"use client";

import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axios";
import { dateTimeFormatter } from "@/lib/utils";
import {
  Booking,
  Movie,
  Screening,
  Seat,
  Studio,
  Ticket,
} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
  const { toast } = useToast();

  const { data: orderHistory, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/user/order-history");

      return response.data as OrderHistoryType[];
    },
    queryKey: ["order-history"],
  });

  const handleCancelOrder = async (id: number) => {
    const res = await axios
      .patch("/api/booking", {
        data: { bookingId: id },
      })
      .then(() => {
        return toast({
          title: "Cancel order success",
          description: `Your balance has been refunded`,
          variant: "default",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Something went wrong",
          description: error.response.data,
          variant: "destructive",
        });
      });
  };

  return (
    <UserInfoLayout className=" flex flex-col gap-2 p-2">
      {isLoading && (
        <div className="flex items-center justify-center w-full my-auto">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {(!isLoading && orderHistory == undefined) ||
        (orderHistory?.length === 0 && (
          <div className="flex items-center justify-center w-full">
            No Orders
          </div>
        ))}

      {orderHistory?.map((order) => (
        <div
          className="flex flex-col border h-fit p-2 rounded-lg shadow-md gap-2"
          key={order.id}
        >
          <div className="grid font-semibold text-sm">
            <span>
              Checkout Date: {dateTimeFormatter(new Date(order.checkoutDate))}
            </span>
            <span>Order ID: {order.id}</span>
          </div>
          <ul className="space-y-2">
            <div key={order.tickets[0].id} className="flex gap-2">
              <div className="w-[95px] rounded-sm overflow-hidden">
                <Image
                  src={order.tickets[0].movie.poster_url}
                  alt={order.tickets[0].movie.title}
                  width={100}
                  height={100}
                />
              </div>
              <li className="flex flex-col">
                <p>Movie: {order.tickets[0].movie.title}</p>
                <p>At: {order.tickets[0].screening.studio.name}</p>
                <p>
                  Show time:{" "}
                  {dateTimeFormatter(order.tickets[0].screening.start_time)}
                </p>
                <p>
                  Seat Number:{" "}
                  <span className="font-bold">
                    {order.tickets.map(
                      (ticket, i) =>
                        ticket.seat.seatNumber +
                        (i !== order.tickets.length - 1 ? ", " : "")
                    )}
                  </span>
                </p>
              </li>
            </div>
            <Button
              className="mt-auto w-fit"
              disabled={new Date(order.tickets[0].screening.start_time) < new Date()}
              onClick={() => handleCancelOrder(order.id)}
            >
              Cancel Order
            </Button>
          </ul>
        </div>
      ))}
    </UserInfoLayout>
  );
};

export default Page;
