import { axiosInstance } from "@/lib/axios";

export function fetchMovies() {
  return axiosInstance.get(`movies/now-showing`);
}
