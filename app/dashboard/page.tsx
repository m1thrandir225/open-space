import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/types/db";
import DashboardPage from "@/components/pages/Dashboard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({cookies});

  const {
    data: {session},
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    redirect("/sign-in");
  }
  return (
    <Suspense fallback={<div> Loading... </div>}>
      <DashboardPage user={session.user} />
    </Suspense>
  );
}
