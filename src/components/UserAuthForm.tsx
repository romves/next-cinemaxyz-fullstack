"use client";

import React, { useState } from "react";

type SignInFormType = {
  username: string;
  password: string;
};

const UserAuthForm = () => {
  const [formDetails, setFormDetails] = useState<SignInFormType>({
    username: "",
    password: "",
  });

  return (
    <div >
      <form className="flex flex-col gap-4">
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
      </form>
    </div>
  );
};

export default UserAuthForm;
