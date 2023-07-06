'use client'

import { useFetchSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const UserSidebar = () => {
  const { data: session } = useFetchSession();

  return (
    <div className="border h-[500px] w-52 rounded-lg my-2 p-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white"></div>
          <span>{session?.username}</span>
        </div>
        <ul>
          <li className="py-1">
            <Link href={`/user/${session?.username}`}>My Profile</Link>
          </li>
          <li className="py-1">
            <Link href="/user/topup" className="flex justify-between"><span>Balance</span><span>{session?.balance}</span></Link>
          </li>
          <li className="py-1">
            <Link href="/user/order-history">Order History</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
