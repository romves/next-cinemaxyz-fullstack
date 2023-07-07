import UserInfoLayout from "@/components/UserInfoLayout";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const orderHistory = await db.booking.findMany({
    include: {
      tickets: {
        include: {
          seat: true,
          movie: true,
          screening: { include: { studio: true } },
        },
      },
    },
  });

  return (
    <UserInfoLayout className=" flex flex-col gap-2 p-2">
      {orderHistory.map((order) => (
        <div
          className="flex flex-col border h-fit p-2 rounded-lg"
          key={order.id}
        >
          <h3>Order ID: {order.id}</h3>
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
