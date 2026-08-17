import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import TeamCollectionClient from "./TeamCollectionClient";

export default async function TeamCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = createAdminClient();

  const { data: team, error } = await supabase
    .from("team_profiles")
    .select(
      "id, name, organization, age_group, season, slug, primary_logo, secondary_logo, colors, order_deadline, order_status, published, active"
    )
    .eq("slug", slug)
    .eq("active", true)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error(
      "Team collection error:",
      error
    );

    notFound();
  }

  if (!team) {
    notFound();
  }

  return (
    <TeamCollectionClient
      team={{
        id: String(team.id),

        name:
          team.name,

        organization:
          team.organization ?? null,

        age_group:
          team.age_group ?? null,

        season:
          team.season ?? null,

        slug:
          team.slug ?? slug,

        primary_logo:
          team.primary_logo ?? null,

        secondary_logo:
          team.secondary_logo ?? null,

        colors:
          team.colors ?? {},

        order_deadline:
          team.order_deadline ?? null,

        order_status:
          team.order_status ===
          "closed"
            ? "closed"
            : "open",
      }}
    />
  );
}