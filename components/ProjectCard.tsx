"use client";

import {Database} from "@/lib/types/db";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import * as ShadAvatar from "./ui/avatar";

import React from "react";

type ProjectCardTypes = {
  project: Database["public"]["Tables"]["projects"]["Row"];
};

const ProjectCard: React.FC<ProjectCardTypes> = ({project}) => {
  const supabase = createClientComponentClient<Database>();
  const getAuthorName = useQuery(["project", project.id], async () => {
    const {data, error} = await supabase
      .from("profiles")
      .select("*")
      .eq("id", project.user_id)
      .single();

    if (error) throw error;

    return data;
  });

  console.log(getAuthorName.data);
  return (
    <article className="flex max-w-xl flex-col items-start justify-between relative">
      <div className="relative w-full h-[200px] rounded-md">
        <Image
          src={project.image}
          fill
          alt={project.name}
          className="rounded-md"
        />
      </div>
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={project.created_at} className="text-gray-500">
          {new Date(project.created_at).toLocaleDateString("en-US")}
        </time>
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {project.name}
        </Link>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={`/dashboard/projects/${project.id}`}>
            <span className="absolute inset-0" />
            {project.name}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {project.description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <ShadAvatar.Avatar className="h-12 w-12">
          <ShadAvatar.AvatarImage src="https://source.boringavatars.com/beam"></ShadAvatar.AvatarImage>
          <ShadAvatar.AvatarFallback>
            {getAuthorName.data?.first_name?.charAt(0)}
            {getAuthorName.data?.last_name?.charAt(0)}
          </ShadAvatar.AvatarFallback>
        </ShadAvatar.Avatar>
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <p>
              <span className="absolute inset-0" />
              {getAuthorName.data?.first_name
                ? `${getAuthorName.data?.first_name} ${getAuthorName.data?.last_name}`
                : `${getAuthorName.data?.username}`}
            </p>
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
