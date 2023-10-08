"use client";

import React from "react";
import {useQuery} from "@tanstack/react-query";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/types/db";
import Onboarding from "@/components/pages/Onboarding";
import ProjectCard from "../ProjectCard";

interface DashboardProps {
  user: Session["user"];
}

/*

User loggs in
Check user tags
if user has tags show dashboard,
if user does not have tags show onboarding process
 */

const DashboardPage: React.FC<DashboardProps> = ({user}) => {
  const supabase = createClientComponentClient<Database>();

  const userTagsQuery = useQuery(["userTags"], async () => {
    const {data, error} = await supabase
      .from("userTags")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      throw error;
    }

    return data;
  });

  const projects = useQuery(["projects"], async () => {
    const {data, error} = await supabase.from("projects").select("*");

    if (error) {
      throw error;
    }

    return data;
  });

  if (userTagsQuery.isLoading) {
    return <div> Loading ... </div>;
  }

  if (userTagsQuery.isError) {
    return <div> Error </div>;
  }

  if (userTagsQuery.data?.length === 0) {
    return <Onboarding user={user} />;
  }

  return (
    <div className="container mx-auto grid grid-cols-3 w-full gap-6">
      {projects.data &&
        projects.data?.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
    </div>
  );
};

export default DashboardPage;
