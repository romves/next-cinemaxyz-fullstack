"use client";

import Link from "next/link";
import React from "react";

const UserAccountNav = () => {
  return (
    <div>
      {localStorage.getItem("token") ? (
        <details >logged in</details>
      ) : (
        <Link href="/sign-in" className="btn btn-primary">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserAccountNav;
