"use client";

import {Button} from "./ui/button";
import {LogOut} from "lucide-react";

const LogoutButton = () => {
  return (
    <form action={"/auth/sign-out"} method="POST">
      <Button
        type="submit"
        className="flex flex-row items-center justify-center gap-4"
      >
        <LogOut size={24} />
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
