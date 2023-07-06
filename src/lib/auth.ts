import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axios";
import { useAuthStore } from "@/store/authStore";
import { User } from "@prisma/client";

export const useFetchSession = () => {
  const { isAuthenticated } = useAuthStore((state) => state);
  return useQuery({
    queryFn: async () => {
      const sessionResponse = await axiosInstance.get("/user/me") 

      return sessionResponse.data as User;
    },
    queryKey: ["session"],
    enabled: isAuthenticated,
  });
};
