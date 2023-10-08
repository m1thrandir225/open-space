import IndexPage from "@/components/pages/Index";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
export const dynamic = "force-dynamic";

export default async function Page1() {
  const supabase = createServerComponentClient({cookies});
  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  return <IndexPage isLoggedIn={user !== null} />;
}
