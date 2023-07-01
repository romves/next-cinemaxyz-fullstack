'use client'

import { useRouter } from "next/navigation";
import React from "react";

const CloseModal = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      aria-label="close modal"
      onClick={() => router.back()}
    >
      ✕
    </button>
  );
};

export default CloseModal;
