import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

type PlayerBody = {
  id?: string;
  teamId?: string;
  playerName?: string;
  fittedSizes?: Record<string, string>;
  active?: boolean;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const teamId = url.searchParams.get("teamId");
    const playerId = url.searchParams.get("playerId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    if (playerId) {
      const { data, error } = await supabase
        .from("team_players")
        .select(
          "id, player_name, fitted_sizes, active, created_at, updated_at"
        )
        .eq("id", playerId)
        .eq("team_id", teamId)
        .eq("active", true)
        .maybeSingle();

      if (error) {
        console.error("Team player GET error:", error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      if (!data) {
        return NextResponse.json(
          { error: "Player not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        player: {
          id: String(data.id),
          player_name: data.player_name,
          fitted_sizes: data.fitted_sizes ?? {},
          active: data.active,
          created_at: data.created_at,
          updated_at: data.updated_at,
        },
      });
    }

    const { data, error } = await supabase
      .from("team_players")
      .select(
        "id, player_name, fitted_sizes, active, created_at, updated_at"
      )
      .eq("team_id", teamId)
      .eq("active", true)
      .order("player_name", { ascending: true });

    if (error) {
      console.error("Team player roster GET error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      players:
        data?.map((player) => ({
          id: String(player.id),
          name: player.player_name,
          player_name: player.player_name,
          fitted_sizes: player.fitted_sizes ?? {},
          active: player.active,
          created_at: player.created_at,
          updated_at: player.updated_at,
        })) ?? [],
    });
  } catch (error) {
    console.error("Team player GET error:", error);

    return NextResponse.json(
      { error: "Unable to load team players." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as PlayerBody;

    const teamId =
      body.teamId?.trim() || "";

    const playerName =
      body.playerName?.trim() || "";

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required." },
        { status: 400 }
      );
    }

    if (!playerName) {
      return NextResponse.json(
        { error: "Player name is required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const fittedSizes =
      body.fittedSizes &&
      typeof body.fittedSizes === "object"
        ? body.fittedSizes
        : {};

    if (body.id) {
      const { data, error } = await supabase
        .from("team_players")
        .update({
          player_name: playerName,
          fitted_sizes: fittedSizes,
          active:
            body.active === undefined
              ? true
              : Boolean(body.active),
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", body.id)
        .eq("team_id", teamId)
        .select(
          "id, player_name, fitted_sizes, active, created_at, updated_at"
        )
        .single();

      if (error) {
        console.error(
          "Team player UPDATE error:",
          error
        );

        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        player: data,
      });
    }

    const { data, error } = await supabase
      .from("team_players")
      .insert({
        team_id: teamId,
        player_name: playerName,
        fitted_sizes: fittedSizes,
        active:
          body.active === undefined
            ? true
            : Boolean(body.active),
      })
      .select(
        "id, player_name, fitted_sizes, active, created_at, updated_at"
      )
      .single();

    if (error) {
      console.error(
        "Team player INSERT error:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      player: data,
    });
  } catch (error) {
    console.error(
      "Team player POST error:",
      error
    );

    return NextResponse.json(
      { error: "Unable to save team player." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body =
      (await request.json()) as PlayerBody;

    const id =
      body.id?.trim() || "";

    const teamId =
      body.teamId?.trim() || "";

    if (!id) {
      return NextResponse.json(
        { error: "Player ID is required." },
        { status: 400 }
      );
    }

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from("team_players")
      .delete()
      .eq("id", id)
      .eq("team_id", teamId);

    if (error) {
      console.error(
        "Team player DELETE error:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Team player DELETE error:",
      error
    );

    return NextResponse.json(
      { error: "Unable to delete team player." },
      { status: 500 }
    );
  }
}