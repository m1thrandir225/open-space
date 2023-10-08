"use client";

import {Database} from "@/lib/types/db";
import Image from "next/image";
import Link from "next/link";

import React from "react";

type ProjectCardTypes = {
  project: Database["public"]["Tables"]["projects"]["Row"];
};

const ProjectCard: React.FC<ProjectCardTypes> = ({project}) => {
  return (
    <Link
      href={`/dashboard/project/${project.id}`}
      className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Image src={project.image} width={64} height={64} alt={project.name} />
      <h2 className="text-lg font-bold">{project.name}</h2>
      <p className="text-sm text-gray-500 text-ellipsis">
        {project.description}
      </p>
    </Link>
  );
};

export default ProjectCard;
