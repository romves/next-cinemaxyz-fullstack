"use client";

import { useFetchSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = (WrappedComponent: any) => {
  // const { loginToast } = useCustomToast();

  const Wrapper = (props: any) => {
    const router = useRouter();

    const { data: session, isLoading } = useFetchSession();

    useEffect(() => {
      if (!session && !isLoading) {
        router.replace("/sign-in");
      }
    }, [session, router, isLoading]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
  return Wrapper;
};

export default ProtectedRoute;
