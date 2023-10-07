"use client";
import {useSearchParams} from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  console.log(error);

  return (
    <form
      action={"/auth/sign-up"}
      method="post"
      className="container h-screen mx-auto bg-blue-900 flex flex-col justify-center items-center gap-6"
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-teal-400"
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-teal-400"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpPage;
