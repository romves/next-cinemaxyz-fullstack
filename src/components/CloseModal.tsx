"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/Button";

const CloseModal = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="absolute right-2 top-2 rounded-full"
      aria-label="close modal"
      onClick={() => router.back()}
    >
      ✕
    </Button>
  );
};

export default CloseModal;
