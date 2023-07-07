"use client";

import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

type SignInFormType = {
  username: string;
  password: string;
};

const SignInAuthForm = () => {
  const { toast } = useToast();
  const { loginHandler } = useAuthStore((state) => state);
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<SignInFormType>({
    username: "",
    password: "",
  });

  const { mutate: signin } = useMutation({
    mutationFn: async () => {
      const payload = {
        username: formDetails.username,
        password: formDetails.password,
      };
      const { data } = await axiosInstance.post("/sign-in", payload);
      return data;
    },
    onSuccess: () => {
      loginHandler();
      toast({
        title: "Success",
        description: "Login success",
      });
      router.back();
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: "Login error please try again later",
        variant: "destructive"
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Username"
        value={formDetails.username}
        onChange={(e) =>
          setFormDetails((prevState) => ({
            ...prevState,
            username: e.target.value,
          }))
        }
        className="input input-bordered"
      />
      <Input
        type="password"
        placeholder="Password"
        value={formDetails.password}
        onChange={(e) =>
          setFormDetails((prevState) => ({
            ...prevState,
            password: e.target.value,
          }))
        }
        className="input input-bordered"
      />
      <Button onClick={() => signin()} className="btn btn-primary">
        Sign In
      </Button>
    </div>
  );
};

export default SignInAuthForm;
