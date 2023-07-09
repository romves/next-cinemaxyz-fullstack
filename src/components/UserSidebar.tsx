"use client";

import { useFetchSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const UserSidebar = () => {
  const router = useRouter();
  const { logoutHandler } = useAuthStore((state) => state);
  const { data: session } = useFetchSession();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      const res = axiosInstance.post("/sign-out");

      return res;
    },
    onSuccess: () => {
      setTimeout(() => {
        logoutHandler();
        router.push("/");
        window.location.reload();
      }, 1000);
    },
  });

  return (
    <div className="hidden md:block border h-fit w-72 rounded-lg my-2 py-2 px-4 shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center">
          <div className="border w-20 h-20 rounded-full bg-white"></div>
          <span>{session?.username}</span>
        </div>
        <ul className="space-y-2">
          <li className="py-1">
            <Link href={`/user/${session?.username}`}>My Profile</Link>
          </li>
          <li className="py-1">
            <Link href="/user/topup" className="flex justify-between">
              <span>Balance</span>
              <span>Rp.{session?.balance}</span>
            </Link>
          </li>
          <li className="py-1">
            <Link href="/user/order-history">Order History</Link>
          </li>
          <li>
            <Button onClick={() => logout()} className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : "Log Out"}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
