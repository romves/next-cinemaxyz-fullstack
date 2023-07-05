"use client";

import { useFetchSession } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserAccountNav = () => {
  const router = useRouter();
  const { logoutHandler, isAuthenticated } = useAuthStore((state) => state);
  const { data: session } = useFetchSession();
  console.log(isAuthenticated)

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = axiosInstance.post("/sign-out");

      return res
    },
    onSuccess: () => {
      setTimeout(() => {
        logoutHandler()
        window.location.reload();
        router.push("/");
      }, 1000);
    },
  });

  return (
    <div>
      {session ? (
        <details className="dropdown dropdown-end">
          <summary className="m-1 btn btn-ghost">
            <div className="bg-white w-10 h-10 rounded-full"></div>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-28">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <button onClick={() => logout()} className="btn btn-sm">
                Log Out
              </button>
            </li>
          </ul>
        </details>
      ) : (
        <Link href="/sign-in" className="btn btn-primary">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserAccountNav;
