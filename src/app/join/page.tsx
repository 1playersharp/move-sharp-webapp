import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ code?: string }>;
};

// Small landing route for the ?code= form on /you/teams. Reads the
// GET-submitted invite code, normalizes it, and redirects into the
// real /join/[code] flow. Kept as a simple redirect so the /you/teams
// form can be pure HTML — no client JS required.
export default async function JoinIndexPage({ searchParams }: Props) {
  const { code } = await searchParams;
  const clean = (code ?? "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!clean) redirect("/you/teams?error=code");
  redirect(`/join/${clean}`);
}
