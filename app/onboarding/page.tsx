import Onboarding from "@/components/pages/Onboarding";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient({cookies});

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  return <Onboarding user={user} />;
}
