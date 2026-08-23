import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PREFIXES = ["/sign-in", "/sign-up", "/auth/", "/sandbox/"];

const DEV_BYPASS =
  process.env.NODE_ENV !== "production" && process.env.MOVESHARP_DEV_BYPASS === "1";

export async function updateSession(request: NextRequest) {
  // Dev bypass: skip session refresh + all redirects so you can walk the
  // app locally without Supabase configured. auth.ts injects a fixture
  // player so page code never sees a null user.
  if (DEV_BYPASS) return NextResponse.next({ request });

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() re-validates the token with Supabase.
  // Do not swap for getSession(), which only reads the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PREFIXES.some((prefix) => path.startsWith(prefix));
  const isRoot = path === "/";

  // Unauthenticated: only "/" (landing) and the auth pages are reachable.
  if (!user && !isPublic && !isRoot) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  // Authenticated: bounce off the auth pages back to home.
  if (user && (path.startsWith("/sign-in") || path.startsWith("/sign-up"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
