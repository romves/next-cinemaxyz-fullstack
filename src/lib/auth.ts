import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axios";
import { useAuthStore } from "@/store/authStore";

export const useFetchSession = () => {
  const { isAuthenticated } = useAuthStore((state) => state);
  return useQuery({
    queryFn: async () => {
      const sessionResponse = await axiosInstance.get("/user/me");

      return sessionResponse.data;
    },
    queryKey: ["session"],
    enabled: isAuthenticated,
  });
};
