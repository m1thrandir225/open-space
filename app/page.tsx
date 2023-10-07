import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Image from "next/image";
import React from "react";
import {Button} from "@/components/ui/button";
import {GithubIcon} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";


export default async function Home() {
    const supabase = createServerComponentClient({cookies});

    const {
        data: {session},
        error,
    } = await supabase.auth.getSession();

    console.log(session?.user);

    //        <Image src="/logo.png" width={64} height={64} alt="Logo" />

    return (
        <div>
            <div className="h-screen flex justify-between p-5">
                <div className="">
                    <Image src="/logo.png" width={64} height={64} alt="Logo"/>
                </div>
                <div>
                    <h1>
                        Find your next contribution.
                    </h1>
                </div>
                <div className="flex justify-center gap-6">
                    <div>
                        <Button asChild>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </div>
                    <div>
                        <Button asChild>
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <h1>
                    AAAAAAAAAAAAAAAAAAAa
                </h1>
            </div>
        </div>


        // <div className="flex justify-center">
        //     <div className="flex justify-between">
        //         <div className="w-1/4">Item 1</div>
        //         <div className="w-1/4">Item 2</div>
        //         <div className="w-1/4">Item 3</div>
        //     </div>
        // </div>

    );
}
