import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("team_profiles")
      .select(
        "id, name, organization, age_group, season, slug, primary_logo, secondary_logo, colors, published, active, order_deadline, order_status, created_at, updated_at"
      )
      .eq("active", true)
      .eq("published", true)
      .order("name", { ascending: true });

    if (error) {
      console.error(
        "Team profile GET error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      teams: data ?? [],
    });
  } catch (error) {
    console.error(
      "Team profile GET error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load team profiles.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      id,
      name,
      organization,
      age_group,
      season,
      slug,
      primary_logo,
      secondary_logo,
      colors,
      order_deadline,
      order_status = "open",
      published = false,
      active = true,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        {
          error:
            "Team name is required.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      createAdminClient();

    const generatedSlug =
      slug?.trim() ||
      name
        .toLowerCase()
        .trim()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          "");

    const normalizedOrderStatus =
      order_status === "closed"
        ? "closed"
        : "open";

    const teamData = {
      ...(id ? { id } : {}),

      name: name.trim(),

      organization:
        organization?.trim() || null,

      age_group:
        age_group?.trim() || null,

      season:
        season?.trim() || null,

      slug: generatedSlug,

      primary_logo:
        primary_logo || null,

      secondary_logo:
        secondary_logo || null,

      colors: colors || {},

      order_deadline:
        order_deadline || null,

      order_status:
        normalizedOrderStatus,

      published: Boolean(published),

      active: Boolean(active),

      updated_at:
        new Date().toISOString(),
    };

    const { data, error } =
      await supabase
        .from("team_profiles")
        .upsert(teamData, {
          onConflict: "id",
        })
        .select()
        .single();

    if (error) {
      console.error(
        "Team profile POST error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      team: data,
    });
  } catch (error) {
    console.error(
      "Team profile POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to save team profile.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          error:
            "Team ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      createAdminClient();

    const { error } =
      await supabase
        .from("team_profiles")
        .delete()
        .eq("id", body.id);

    if (error) {
      console.error(
        "Team profile DELETE error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Team profile DELETE error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to delete team profile.",
      },
      {
        status: 500,
      }
    );
  }
}