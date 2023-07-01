import SignIn from "@/components/SignIn";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full  max-w-2xl mx-auto flex items-center justify-center gap-20">
        <div className="h-fit w-full flex flex-col pb-32 gap-20">
          <Link href="/" className="btn self-start">
            Home
          </Link>

          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default page;
