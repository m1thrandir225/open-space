import Image from "next/image";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({cookies});

  const {data, error} = await supabase.from("tags").select("*");

  return (
    <div>
      {data?.map((tag) => (
        <h1 key={tag.id}> {tag.name}</h1>
      ))}
    </div>
  );
}
