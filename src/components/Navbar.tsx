import Link from "next/link";
import React from "react";
import UserAccountNav from "./UserAccountNav";

const Navbar = () => {
  return (
    <nav className="flex top-0 sticky h-[70px] w-full justify-between items-center bg-white border-b z-50">
      <div className="container flex justify-between items-center">
        <Link href="/" className="font-bold">CINEMAXYZ</Link>
        <div className="flex items-center gap-4">
          <span>Hello {}</span>

          {/* USER ACCOUNT NAV */}
          {/* <Image /> */}
          <UserAccountNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
