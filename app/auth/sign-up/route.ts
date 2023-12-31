import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({cookies});

  console.log(email, password);

  const {
    error,
    data: {user},
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/sign-up?error=${error.message}`,
      {
        status: 301,
      }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/onboarding`, {
    status: 301,
  });
}
