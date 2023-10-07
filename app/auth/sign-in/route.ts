import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  // Handle signInWithPassword
  const {
    error: passwordError,
    data: { user: passwordUser },
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (passwordError) {
    // Handle the error from signInWithPassword
    return NextResponse.redirect(
        `${requestUrl.origin}/sign-in?error=${passwordError.message}`,
        {
          // A 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
    );
  }

  // Handle signInWithOAuth
  try {
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (oauthError) {
      // Handle the error from signInWithOAuth
      return NextResponse.redirect(
          `${requestUrl.origin}/sign-in?error=${oauthError.message}`,
          {
            // A 301 status is required to redirect from a POST to a GET route
            status: 301,
          }
      );
    }
  } catch (error) {
    // Handle any unexpected errors from signInWithOAuth
    return NextResponse.redirect(
        `${requestUrl.origin}/sign-in?error=An unexpected error occurred`,
        {
          // A 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
    );
  }

  // If both authentication methods succeed, redirect to the origin
  return NextResponse.redirect(requestUrl.origin, {
    // A 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
