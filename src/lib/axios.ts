import axios from "axios";

export const axiosInstance =
  process.env.NODE_ENV === "production"
    ? axios.create({
        baseURL: `${process.env.VERCEL_URL}/api`,
      })
    : axios.create({
        baseURL: "http://localhost:3000/api",
      });
