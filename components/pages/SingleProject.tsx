"use client";
import {Database} from "@/lib/types/db";
import React from "react";
import Image from "next/image";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import Link from "next/link";
import * as ShadAvatar from "../ui/avatar";

type SingleProjectProps = {
  project: Database["public"]["Tables"]["projects"]["Row"];
  projectTags: any[] | null;
  author: Database["public"]["Tables"]["profiles"]["Row"];
};

const SingleProject: React.FC<SingleProjectProps> = ({
  project,
  projectTags,
  author,
}) => {
  return (
    <div className=" mx-auto w-full flex items-center justify-center">
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto mt-10 lg:mt-20 space-y-6">
          <div className="relative container mx-auto w-full h-[450px] rounded-xl overflow-hidden">
            <Image
              src={project.image}
              alt=""
              className="rounded-xl object-cover"
              fill
            />
          </div>
          <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-12 gap-x-10">
            <div className="col-span-4 lg:text-center lg:pt-14 mb-10">
              <p className="mt-4 block text-gray-400 text-xs">
                Published <span>1 day ago</span>
              </p>

              <div className="flex items-center lg:justify-center text-sm mt-4">
                <ShadAvatar.Avatar className="h-12 w-12">
                  <ShadAvatar.AvatarImage src="https://source.boringavatars.com/beam"></ShadAvatar.AvatarImage>
                  <ShadAvatar.AvatarFallback>
                    {author.first_name?.charAt(0)}
                    {author.last_name?.charAt(0)}
                  </ShadAvatar.AvatarFallback>
                </ShadAvatar.Avatar>
                <div className="ml-3 text-left" />
                Author:{" "}
                <h5 className="font-bold">
                  <p>
                    {" "}
                    {author.first_name
                      ? `${author.first_name + " " + author.last_name}`
                      : `${author.username}`}{" "}
                  </p>
                </h5>
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div className="hidden lg:flex justify-between mb-6">
              <Link
                href="/dashboard"
                className="transition-colors duration-300 relative inline-flex items-center text-lg hover:text-blue-500"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  className="mr-2"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      stroke="#000"
                      strokeOpacity=".012"
                      strokeWidth=".5"
                      d="M21 1v20.16H.84V1z"
                    ></path>
                    <path
                      className="fill-current"
                      d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
                    ></path>
                  </g>
                </svg>
                Go back
              </Link>

              <Button>Participate</Button>
            </div>

            <div className="space-x-2 flex flex-row items-center justify-start gap-4 my-4">
              {projectTags?.map((projectTag, index) => (
                <p
                  key={index}
                  className="px-4 py-2 outline-2 outline outline-accent-foreground rounded-full"
                >
                  {projectTag.tags.name}
                </p>
              ))}
            </div>

            <h1 className="font-bold text-3xl lg:text-4xl mb-10">
              {project.name}
            </h1>

            <div className="space-y-4 lg:text-lg leading-loose">
              <p>{project.description}</p>
            </div>
            <div className="space-y-4 lg:text-lg leading-loose my-8">
              <h1 className="text-2xl font-bold my-2">Links</h1>
              {project.links &&
                project.links["links"] &&
                typeof project.links["links"] !== "string" &&
                project.links["links"].map((link, index) => (
                  <Link
                    href={`${link.url}`}
                    target="_blank"
                    key={index.toString}
                    className="underline text-xl font-medium"
                  >
                    {link.url}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
