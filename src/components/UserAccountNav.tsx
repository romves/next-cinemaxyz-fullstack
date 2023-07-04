"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserAccountNav = () => {
  const router = useRouter();
  const { logoutHandler, isAuthenticated } = useAuthStore((state) => state);

  const handleLogout = () => {
    try {
      logoutHandler();
      setTimeout(() => {
        window.location.reload();
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <details className="dropdown">
          <summary className="m-1 btn">open or close</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-sm">
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
