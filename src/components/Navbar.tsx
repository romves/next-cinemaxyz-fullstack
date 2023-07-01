import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex fixed h-[70px] w-full justify-between items-center bg-black">
      <div className="container border flex justify-between items-center">
        <Link href="/">CINEMAXYZ</Link>
        <div className="flex items-center gap-4">
          <span>Hello {}</span>

          {/* USER ACCOUNT NAV */}
          {/* <Image /> */}
          <Link href="/sign-in" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
