'use client'


import SignUp from "@/shared/components/auth/SignUp";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen>
      <DialogContent
        closeHandler={() => router.back()}
        withClose
        className="sm:max-w-md w-fit"
      >
        <SignUp />
      </DialogContent>
    </Dialog>
  );
};

export default Page;
