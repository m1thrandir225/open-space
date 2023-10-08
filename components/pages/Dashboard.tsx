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

const DashboardPage: React.FC<DashboardProps> = ({user}) => {
  const supabase = createClientComponentClient<Database>();

  const projects = useQuery(["projects"], async () => {
    const {data, error} = await supabase.from("projects").select("*");

    if (error) {
      throw error;
    }

    return data;
  });

  if (projects.isLoading) {
    return <div> Loading ... </div>;
  }

  if (projects.isError) {
    return <div> Error </div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-3 w-full gap-6 my-6">
      {projects.data &&
        projects.data?.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
    </div>
  );
};

export default DashboardPage;
