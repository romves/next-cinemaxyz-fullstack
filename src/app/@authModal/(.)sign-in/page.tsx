"use client";

import SignIn from "@/components/auth/SignIn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen>
      <DialogContent
        closeHandler={() => router.back()}
        withClose
        className="sm:max-w-md w-fit"
      >
        <SignIn />
      </DialogContent>
    </Dialog>
  );
};

export default Page;
