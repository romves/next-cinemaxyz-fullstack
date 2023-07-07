import SignIn from "@/components/auth/SignIn";
import Link from "next/link";
import React from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const page = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full  max-w-2xl mx-auto flex items-center justify-center gap-20">
        <div className="h-fit w-full flex flex-col pb-32 gap-20">
          <Link href="/" className="self-start space-x-4">
            <FontAwesomeIcon icon={faChevronLeft} /> <span>Home</span>
          </Link>

          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default page;
