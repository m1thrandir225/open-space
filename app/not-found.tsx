import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="container mx-auto h-screen flex justify-between items-center">
      <div className="flex flex-col items-center justify-start gap-4">
        <h1 className="text-5xl font-bold text-red-800">
          Oops, doesn&apos;t exist{" "}
        </h1>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>

      <Image src="/404.png" width={500} height={500} alt="not found" />
    </div>
  );
}
