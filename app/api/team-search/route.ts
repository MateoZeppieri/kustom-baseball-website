import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

type TeamRow = {
  id: string;
  name: string;
  organization: string | null;
  age_group: string | null;
  season: string | null;
  slug: string | null;
  primary_logo: string | null;
  secondary_logo: string | null;
  colors: Record<string, string> | null;
  published: boolean;
  active: boolean;
};

/* -------------------------------------------------------------------------- */
/* NORMALIZE TEXT                                                             */
/* -------------------------------------------------------------------------- */

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* -------------------------------------------------------------------------- */
/* LEVENSHTEIN DISTANCE                                                       */
/* -------------------------------------------------------------------------- */

function levenshtein(
  a: string,
  b: string
) {
  const matrix: number[][] = [];

  for (
    let i = 0;
    i <= b.length;
    i++
  ) {
    matrix[i] = [i];
  }

  for (
    let j = 0;
    j <= a.length;
    j++
  ) {
    matrix[0][j] = j;
  }

  for (
    let i = 1;
    i <= b.length;
    i++
  ) {
    for (
      let j = 1;
      j <= a.length;
      j++
    ) {
      if (
        b.charAt(i - 1) ===
        a.charAt(j - 1)
      ) {
        matrix[i][j] =
          matrix[i - 1][j - 1];
      } else {
        matrix[i][j] =
          Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
      }
    }
  }

  return matrix[b.length][a.length];
}

/* -------------------------------------------------------------------------- */
/* SIMILARITY                                                                 */
/* -------------------------------------------------------------------------- */

function similarity(
  query: string,
  value: string
) {
  const q = normalize(query);
  const v = normalize(value);

  if (!q || !v) {
    return 0;
  }

  if (v === q) {
    return 1;
  }

  if (v.includes(q)) {
    return 0.95;
  }

  if (q.includes(v)) {
    return 0.9;
  }

  const queryWords = q.split(" ");
  const valueWords = v.split(" ");

  let bestWordScore = 0;

  for (const queryWord of queryWords) {
    if (queryWord.length < 2) {
      continue;
    }

    for (const valueWord of valueWords) {
      if (valueWord.length < 2) {
        continue;
      }

      const distance =
        levenshtein(
          queryWord,
          valueWord
        );

      const maxLength =
        Math.max(
          queryWord.length,
          valueWord.length
        );

      const score =
        1 -
        distance /
          maxLength;

      if (
        score >
        bestWordScore
      ) {
        bestWordScore = score;
      }
    }
  }

  return bestWordScore;
}

/* -------------------------------------------------------------------------- */
/* GET                                                                        */
/* -------------------------------------------------------------------------- */

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const query =
      searchParams
        .get("q")
        ?.trim() || "";

    if (!query) {
      return NextResponse.json({
        teams: [],
      });
    }

    const supabase =
      createAdminClient();

    const { data, error } =
      await supabase
        .from("team_profiles")
        .select(
          "id, name, organization, age_group, season, slug, primary_logo, secondary_logo, colors, published, active"
        )
        .eq("active", true)
        .eq("published", true);

    if (error) {
      console.error(
        "Team search database error:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }

    const teams =
      (data ?? []) as TeamRow[];

    /* ---------------------------------------------------------------------- */
    /* SCORE EACH TEAM                                                        */
    /* ---------------------------------------------------------------------- */

    const scoredTeams =
      teams
        .map((team) => {
          const nameScore =
            similarity(
              query,
              team.name
            );

          const organizationScore =
            similarity(
              query,
              team.organization ||
                ""
            );

          const slugScore =
            similarity(
              query,
              team.slug || ""
            );

          const bestScore =
            Math.max(
              nameScore,
              organizationScore,
              slugScore
            );

          return {
            team,
            score:
              bestScore,
          };
        })
        .filter(
          ({ score }) =>
            score >= 0.55
        )
        .sort(
          (a, b) =>
            b.score -
            a.score
        )
        .slice(0, 10);

    return NextResponse.json({
      teams:
        scoredTeams.map(
          ({ team }) => ({
            id:
              String(team.id),

            name:
              team.name,

            organization:
              team.organization,

            age_group:
              team.age_group,

            season:
              team.season,

            slug:
              team.slug,

            primaryLogo:
              team.primary_logo,

            secondaryLogo:
              team.secondary_logo,

            colors:
              team.colors || {},

            published:
              Boolean(
                team.published
              ),

            active:
              Boolean(
                team.active
              ),
          })
        ),
    });
  } catch (error) {
    console.error(
      "Team search error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to search teams.",
      },
      {
        status: 500,
      }
    );
  }
}