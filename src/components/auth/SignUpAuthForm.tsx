"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type SignUpFormType = {
  username: string;
  password: string;
  fullname: string;
  age: number | null;
};

const SignUpAuthForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<SignUpFormType>({
    username: "",
    password: "",
    fullname: "",
    age: null,
  });

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        username: formDetails.username,
        password: formDetails.password,
        fullname: formDetails.fullname,
        age: formDetails.age,
      };
      const { data } = await axiosInstance.post("/sign-up", payload);
      return data as string;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Signup success",
      });
      router.back();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Signup error please try again later",
        variant: "destructive",
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
      <Input
        type="text"
        placeholder="Fullname"
        value={formDetails.fullname}
        onChange={(e) =>
          setFormDetails((prevState) => ({
            ...prevState,
            fullname: e.target.value,
          }))
        }
        className="input input-bordered"
      />
      <Input
        type="number"
        placeholder="Age"
        value={formDetails.age || ""}
        onChange={(e) =>
          setFormDetails((prevState) => ({
            ...prevState,
            age: Number(e.target.value),
          }))
        }
        className="input input-bordered"
      />
      <Button onClick={() => signup()} className="btn btn-primary">
        {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
      </Button>
    </div>
  );
};

export default SignUpAuthForm;
