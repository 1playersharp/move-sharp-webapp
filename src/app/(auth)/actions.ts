"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function toRedirectUrl(pathname: string, params: Record<string, string> = {}) {
  const url = new URL(pathname, "http://localhost");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.pathname + url.search;
}

async function siteOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (!email || !password) {
    redirect(toRedirectUrl("/sign-in", { error: "Email and password are required." }));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(toRedirectUrl("/sign-in", { error: "That email and password don't match." }));
  }

  redirect(next.startsWith("/") ? next : "/");
}

export async function signUpWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 8) {
    redirect(
      toRedirectUrl("/sign-up", {
        error: "Enter an email and a password of at least 8 characters.",
      }),
    );
  }

  const supabase = await createSupabaseServerClient();
  const origin = await siteOrigin();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback?next=/onboarding` },
  });

  if (error) {
    redirect(toRedirectUrl("/sign-up", { error: error.message }));
  }

  // If email confirmation is enabled in Supabase (default), we can't sign in yet.
  redirect(toRedirectUrl("/sign-up", { pending: "1" }));
}

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const next = String(formData.get("next") ?? "/");

  if (!email) {
    redirect(toRedirectUrl("/sign-in", { method: "magic", error: "Enter an email address." }));
  }

  const supabase = await createSupabaseServerClient();
  const origin = await siteOrigin();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });

  if (error) {
    redirect(toRedirectUrl("/sign-in", { method: "magic", error: error.message }));
  }

  redirect(toRedirectUrl("/sign-in", { method: "magic", sent: "1" }));
}

// Manager sign-up — same auth flow as signUpWithPassword, but the
// email confirmation link routes back to /onboarding/manager instead
// of /onboarding. Also stashes intent="manager" in Supabase user
// metadata as a defence-in-depth check the onboarding page uses.
export async function signUpAsManager(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 8) {
    redirect(
      toRedirectUrl("/sign-up/manager", {
        error: "Enter an email and a password of at least 8 characters.",
      }),
    );
  }

  const supabase = await createSupabaseServerClient();
  const origin = await siteOrigin();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/onboarding/manager`,
      data: { intent: "manager" },
    },
  });

  if (error) {
    redirect(toRedirectUrl("/sign-up/manager", { error: error.message }));
  }

  redirect(toRedirectUrl("/sign-up/manager", { pending: "1" }));
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
