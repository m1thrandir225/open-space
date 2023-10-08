import {SettingsIcon} from "lucide-react";

export default function SettingsPage() {
  return (
    <h1 className="text-2xl font-bold flex flex-row items-start justify-center gap-4">
      {" "}
      Settings <SettingsIcon size={24} />
    </h1>
  );
}
