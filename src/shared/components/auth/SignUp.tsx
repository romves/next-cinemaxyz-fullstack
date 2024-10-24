import Link from "next/link";
import React from "react";
import SignUpAuthForm from "./SignUpAuthForm";

const SignUp = () => {
  return (
    <div className="flex flex-col mx-auto space-y-4 text-center">
      {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
      <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
      <p className="text-sm max-w-xs mx-auto">
        By continuing, you are setting up an account and agree to our User
        Agreeement and Privacy Policy.
      </p>

      <SignUpAuthForm />

      <p className="px-8 text-center text-sm ">
        Already have account ?{" "}
        <Link
          href="/sign-in"
          className=" text-sm hover:underline underline-offset-4"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
