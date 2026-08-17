import { createClient } from "@/lib/supabase-server";
import Countdown from "./Countdown";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const supabase = await createClient();

  const { data: orderToken, error } = await supabase
    .from("order_tokens")
    .select(`
      id,
      player_id,
      token_hash,
      expires_at,
      active,
      players (
        first_name,
        last_name,
        jersey_number,
        team_id
      )
    `)
    .eq("token_hash", token)
    .eq("active", true)
    .single();

  if (error || !orderToken) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-8 py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            Kustom Baseball
          </p>

          <h1 className="mt-4 text-5xl font-bold uppercase leading-[0.9]">
            ORDER LINK INVALID
          </h1>

          <p className="mt-5 text-white/50">
            This personalized order link is no longer active.
          </p>
        </div>
      </main>
    );
  }

  const player = Array.isArray(orderToken.players)
    ? orderToken.players[0]
    : orderToken.players;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-8 py-24">

        {/* BRAND */}
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
          Kustom Baseball
        </p>

        {/* HEADER */}
        <h1 className="mt-4 text-5xl font-bold uppercase leading-[0.9] md:text-7xl">
          YOUR PLAYER ORDER
        </h1>

        <p className="mt-5 text-lg text-white/50">
          Your personalized Kitchener Panthers collection.
        </p>

        {/* PLAYER */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-3xl font-semibold">
            {player?.first_name} {player?.last_name}
          </p>

          <p className="mt-2 text-white/40">
            Jersey #{player?.jersey_number}
          </p>
        </div>

        {/* COUNTDOWN */}
        <Countdown deadline={orderToken.expires_at} />

        {/* PRODUCTS - COMING NEXT */}
        <div className="mt-20 border-t border-white/10 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Your Collection
          </p>

          <h2 className="mt-3 text-4xl font-bold uppercase">
            Select Your Gear
          </h2>

          <p className="mt-4 max-w-xl text-white/50">
            Choose the gear you want to order for your season.
          </p>
        </div>

      </div>
    </main>
  );
}