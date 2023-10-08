"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {GithubIcon, BotIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import React from "react";

export default function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  const supabase = createClientComponentClient();

  const handleLoginWithGithub = React.useCallback(async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error(error);
    }
  }, [supabase.auth]);

  const handleLoginWithGoogle = React.useCallback(async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error);
    }
  }, [supabase.auth]);

  return (
    <div className="h-screen mx-auto w-full flex items-center justify-center">
      <div className="flex flex-row justify-between items-center container mx-auto">
        <div className="flex flex-col items-start gap-6 justify-start w-full max-w-[400px]">
          <h1 className="w-full text-center text-2xl font-bold"> Sign Up </h1>
          <Button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full flex flex-row items-center justify-center gap-2"
          >
            <BotIcon size={24} />
            Continue with Google
          </Button>
          <Button
            type="button"
            onClick={handleLoginWithGithub}
            className="w-full flex flex-row items-center justify-center gap-2"
          >
            <GithubIcon size={24} />
            Continue with Github
          </Button>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md w-full max-w-[400px] text-center">
              {error}
            </div>
          )}
          <p className="text-center w-full"> or </p>
          <form
            className="flex flex-col gap-4 items-start justify-start w-full"
            action={"/auth/sign-up"}
            method="POST"
          >
            <div className="flex flex-col gap-2 items-start justify-start w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={email}
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 items-start justify-start w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
          <p className="w-full text-center">
            Already have an account?{" "}
            <Link href="sign-in" className="underline">
              Sign in
            </Link>
          </p>
        </div>
        <Image src="/lady-with-cat.png" width={500} height={500} alt="Logo" />
      </div>
    </div>
  );
}
