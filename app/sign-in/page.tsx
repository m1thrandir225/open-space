"use client";
import React from "react";

const SignUpPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <form
      action={"/auth/sign-in"}
      method="post"
      className="container h-screen mx-auto bg-blue-900 flex flex-col justify-center items-center gap-6"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-teal-400"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpPage;
