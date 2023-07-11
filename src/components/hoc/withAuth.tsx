"use client";

import { useFetchSession } from "@/lib/auth";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = (WrappedComponent: NextPage) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    // Check if user is authenticated
    const { data: session } = useFetchSession();

    useEffect(() => {
      // Redirect to login if user is not authenticated
      if (!session) {
        router.push("/");
      }
    }, [session, router]);

    if (!session) {
      // You can show a loading state or a message here
      return <div>Loading...</div>;
    }

    // Render the protected component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
