import React from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Database} from "@/lib/types/db";
import SingleProject from "@/components/pages/SingleProject";
export default async function Page({
  params,
  searchParams,
}: {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const supabase = createServerComponentClient<Database>({cookies});

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  const {data, error: error2} = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  const {data: projectTags, error: error3} = await supabase
    .from("projectTags")
    .select(
      `   
      tags ( name )
    `
    )
    .eq("project_id", params.id);

  console.log(projectTags);

  const {data: author, error: authorError} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data!!.user_id)
    .single();

  if (error || !user) {
    redirect("/sign-in");
  }
  if (error2 || !data) {
    redirect("/dashboard");
  }

  if (authorError || !author) {
    redirect("/dashboard");
  }

  if (!projectTags || error3) {
    redirect("/dashboard");
  }

  return (
    <SingleProject project={data} projectTags={projectTags} author={author} />
  );
}
