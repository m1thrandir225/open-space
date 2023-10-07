"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {GithubIcon} from "lucide-react";
import Image from "next/image";
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
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.error(error);
    }
  }, [supabase.auth]);

  const handleLoginWithGoogle = React.useCallback(async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      console.error(error);
    }
  }, [supabase.auth]);

  return (
    <div className="h-screen mx-auto w-full">
      <div className="flex flex-row justify-between items-center container mx-auto">
        <div className="flex flex-col items-start gap-6 justify-start w-full max-w-[400px]">
          <Button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full flex flex-row items-center justify-center gap-2"
          >
            <GithubIcon size={24} />
            Sign in with Google
          </Button>
          <Button
            type="button"
            onClick={handleLoginWithGithub}
            className="w-full flex flex-row items-center justify-center gap-2"
          >
            <GithubIcon size={24} />
            Sign in with Github
          </Button>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>
          )}
          <p className="text-center w-full"> or </p>
          <form
            className="flex flex-col gap-4 items-start justify-start w-full"
            action={"/auth/sign-in"}
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
        </div>
        <Image src="/logo.png" width={500} height={500} alt="Logo" />
      </div>
    </div>
  );
}
