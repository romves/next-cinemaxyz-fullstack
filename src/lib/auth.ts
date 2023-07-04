import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const AuthSession = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    
    if (isLoggedIn) {
      console.log("loggedin");
    }
  }, []);
};
