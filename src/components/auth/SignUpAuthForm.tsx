"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SignUpFormType = {
  username: string;
  password: string;
  fullname: string;
  age: number | null;
};

const SignUpAuthForm = () => {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<SignUpFormType>({
    username: "",
    password: "",
    fullname: "",
    age: 0,
  });

  const { mutate: signup } = useMutation({
    mutationFn: async () => {
      const payload = {
        username: formDetails.username,
        password: formDetails.password,
        fullname: formDetails.fullname,
        age: formDetails.age,
      };
      const { data } = await axios.post("/api/sign-up", payload);
      return data as string;
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      router.back();
    },
  });

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
      <input
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
      <input
        type="number"
        placeholder="Age"
        value={formDetails.age!}
        onChange={(e) =>
          setFormDetails((prevState) => ({
            ...prevState,
            age: Number(e.target.value),
          }))
        }
        className="input input-bordered"
      />
      <button onClick={() => signup()} className="btn btn-primary">
        Sign Up
      </button>
    </div>
  );
};

export default SignUpAuthForm;
