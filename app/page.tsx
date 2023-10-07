import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import LogoutButton from "@/components/LogoutButton";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";

export default async function Home() {
  const supabase = createServerComponentClient({cookies});

  const {
    data: {session},
    error,
  } = await supabase.auth.getSession();

  console.log(session?.user);

  return (
    <div>{session?.user ? <LogoutButton /> : <Button> Login </Button>}</div>
  );
}
