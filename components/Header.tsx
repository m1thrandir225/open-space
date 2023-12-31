"use client";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {Button} from "./ui/button";
import * as ShadAvatar from "./ui/avatar";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/types/db";

import Link from "next/link";
import {PlusIcon} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {usePathname, useRouter} from "next/navigation";
const DashboardHeader: React.FC = () => {
  const {data: user, isLoading: userLoading} = useQuery(["user"], async () => {
    const {
      data: {user},
      error,
    } = await supabase.auth.getUser();

    return user;
  });

  const {data: userProfile, isLoading: userProfileLoading} = useQuery(
    ["userProfile", user?.id],
    async () => {
      const {data: userProfile, error} = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!!.id)
        .single();

      return userProfile;
    },
    {
      enabled: user?.id !== undefined && user?.id !== null,
    }
  );

  const supabase = createClientComponentClient<Database>();

  const pathname = usePathname();

  return (
    <div className="w-full py-4 container mx-auto flex flex-row items-center justify-between">
      <Image src={"/logo.png"} width={74} height={74} alt="Open Space" />
      <div className="flex flex-row items-center gap-4">
        {pathname === "/dashboard/projects/create" ? null : (
          <Button asChild>
            <Link
              href="/dashboard/projects/create"
              className="flex flex-row items-center justify-center"
            >
              <PlusIcon size={16} /> New
            </Link>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"ghost"}
              className="relative h-12 w-12 rounded-full"
            >
              <ShadAvatar.Avatar className="h-12 w-12">
                <ShadAvatar.AvatarImage src="https://source.boringavatars.com/beam"></ShadAvatar.AvatarImage>
                <ShadAvatar.AvatarFallback>
                  {userProfile?.first_name?.charAt(0)}
                  {userProfile?.last_name?.charAt(0)}
                </ShadAvatar.AvatarFallback>
              </ShadAvatar.Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userProfile?.first_name + " " + userProfile?.last_name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={"/auth/sign-out"} method="POST">
                <button type="submit">Logout </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
