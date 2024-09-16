import Link from "next/link";
import React from "react";
import SignInAuthForm from "./SignInAuthForm";

const SignIn = () => {
  return (
    <div className="flex flex-col w-full space-y-4 text-center">
      {/* <Icons.logo className="w-6 h-6 mx-auto" /> */}
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="max-w-xs mx-auto text-sm">
        By continuing, you are setting up an account and agree to our User
        Agreeement and Privacy Policy.
      </p>

      {/* <UserAuthForm /> */}
      <SignInAuthForm />

      <p className="px-8 text-sm text-center ">
        Dont have account ?{" "}
        <Link
          href="/sign-up"
          className="text-sm hover:underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
