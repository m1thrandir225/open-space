"use client";

import {Button} from "./ui/button";
import {LogOut} from "lucide-react";

type LogoutButtonProps = {
  variant?: "ghost";
};

const LogoutButton: React.FC<LogoutButtonProps> = ({variant}) => {
  return (
    <form action={"/auth/sign-out"} method="POST">
      <Button
        variant={variant}
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
