import { NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "Stripe checkout error: STRIPE_SECRET_KEY is not configured."
      );

      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const body = await request.json();

    const items = Array.isArray(body.items)
      ? (body.items as CheckoutItem[])
      : [];

    if (!items.length) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const teamId = String(body.teamId || "");
    const teamName = String(body.teamName || "");
    const teamSlug = String(body.teamSlug || "");
    const playerName = body.playerName
      ? String(body.playerName)
      : "";
    const fittedSizes =
      body.fittedSizes &&
      typeof body.fittedSizes === "object"
        ? body.fittedSizes
        : {};

    if (!teamSlug) {
      return NextResponse.json(
        { error: "Team information is missing." },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      "http://localhost:3000";

    const playerSummary =
      playerName || "Not selected";

    const fittedSizesSummary =
      Object.entries(
        fittedSizes as Record<string, unknown>
      )
        .map(
          ([productId, size]) =>
            `${productId}:${String(size)}`
        )
        .join(", ")
        .slice(0, 480);

    const metadata = {
      team_id: teamId,
      team_name: teamName,
      team_slug: teamSlug,
      player_name: playerSummary,
      fitted_sizes: fittedSizesSummary,
    };

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        line_items: items.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
              metadata,
            },
            unit_amount: Math.round(
              item.price * 100
            ),
          },
        })),

        metadata,

        success_url:
          `${origin}/team/${encodeURIComponent(
            teamSlug
          )}?checkout=success`,

        cancel_url:
          `${origin}/team/${encodeURIComponent(
            teamSlug
          )}?checkout=cancelled`,
      });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Stripe checkout error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create Stripe checkout.",
      },
      { status: 500 }
    );
  }
}