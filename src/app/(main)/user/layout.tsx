"use client";

import withAuth from "@/shared/components/hoc/withAuth";
import UserSidebar from "@/shared/components/UserSidebar";
import { NextPage } from "next";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container flex gap-2 h-fit">
      <UserSidebar />
      {children}
    </div>
  );
};

export default withAuth(Layout as NextPage);
