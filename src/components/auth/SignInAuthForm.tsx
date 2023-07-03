"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SignInFormType = {
  username: string;
  password: string;
};

const SignInAuthForm = () => {
  const router = useRouter()
  const [formDetails, setFormDetails] = useState<SignInFormType>({
    username: "",
    password: "",
  });

  const { mutate: login} = useMutation({
    mutationFn: async () => {
      const payload = {
        username: formDetails.username,
        password: formDetails.password,
      }
      const { data } = await axios.post("/api/sign-in", payload)
      return data as string
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data);
      router.back()
    },
  })

  return (
    <div className="flex flex-col gap-4">
        <input
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
        <input
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
        <button onClick={() => login()} className="btn btn-primary">Sign In</button>
      </div>
  );
};

export default SignInAuthForm;
