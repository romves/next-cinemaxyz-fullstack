import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const UserInfoLayout = ({ children, className }: { children: ReactNode, className: string }) => {
  return <div className={cn("user-page-layout shadow-md", className)}>{children}</div>;
};

export default UserInfoLayout;
