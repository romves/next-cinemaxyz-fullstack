"use client";

import { useFetchSession } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { currencyFormatter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

const UserAccountNav = () => {
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
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarImage src="s" alt="@shadcn" />
              <AvatarFallback>{session.fullname.split(" ").map((i) => i.charAt(0).toUpperCase())}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col items-center justify-center">
            <DropdownMenuItem>
              <Link href={`/user/${session.username}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/balance"}>
                {currencyFormatter(session.balance)}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/order-history"}>Order History</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => logout()} className="btn btn-sm">
                {isLoading ? <Loader2 className="animate-spin" /> : "Log Out"}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/sign-in"
          className={`${buttonVariants({ variant: "default" })}btn btn-primary`}
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserAccountNav;
