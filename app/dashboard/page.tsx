import React, {Suspense} from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/types/db";
import DashboardPage from "@/components/pages/Dashboard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({cookies});

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }
  return (
    <Suspense fallback={<div> Loading... </div>}>
      <DashboardPage user={user} />
    </Suspense>
  );
}
