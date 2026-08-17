 "use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type Team = {
  id: string;
  name: string;
  organization: string | null;
  age_group: string | null;
  season: string | null;
  slug: string;
  primary_logo: string | null;
  secondary_logo: string | null;
  colors: Record<string, string>;
  order_deadline: string | null;
  order_status: "open" | "closed";
};

type Player = {
  id: string;
  name: string;
  fitted_sizes: Record<string, string>;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type Bundle = {
  id: string;
  name: string;
  price: number;
  value: number;
  subtitle: string;
  description: string;
  recommended?: boolean;
  products: string[];
  quantities?: Record<string, number>;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const PRODUCTS: Product[] = [
  {
    id: "long-cuff-gloves",
    name: "Long Cuff Batting Gloves",
    price: 110,
    image: "/images/Products/batting-gloves/long-cuff/long-cuff-batting-gloves.png",
  },
  {
    id: "short-cuff-gloves",
    name: "Short Cuff Batting Gloves",
    price: 90,
    image: "/images/Products/batting-gloves/short-cuff/short-cuff-batting-gloves.PNG",
  },
  {
    id: "sliding-mitt",
    name: "Sliding Mitt",
    price: 95,
    image: "/images/Products/sliding-mitt/sliding-mitt.png",
  },
  {
    id: "extended-elbow",
    name: "Extended Protection Elbow Guard",
    price: 100,
    image: "/images/Products/elbow-guards/extended/elbow-guard.png",
  },
  {
    id: "elbow-guard",
    name: "Elbow Guard",
    price: 80,
    image: "/images/Products/elbow-guards/standard/Single Strap Elbow Guard.jpeg",
  },
  {
    id: "extended-leg",
    name: "Extended Protection Leg Guard",
    price: 120,
    image: "/images/Products/leg-guard/leg-guard.png",
  },
  {
    id: "hand-guard",
    name: "Hand Guard",
    price: 70,
    image: "/images/Products/hand-guard/hand-guard.png",
  },
  {
    id: "arm-sleeves",
    name: "Arm Sleeves",
    price: 35,
    image: "/images/Products/arm-sleeves/arm-sleeves.png",
  },
];

const BUNDLES: Bundle[] = [
  {
    id: "armor-series",
    name: "Armour Series",
    price: 350,
    value: 385,
    subtitle: "Complete Protection",
    description:
      "Protection built to match your team.",
    products: [
      "hand-guard",
      "extended-elbow",
      "extended-leg",
      "sliding-mitt",
    ],
  },
  {
    id: "legacy-series",
    name: "Legacy Series",
    price: 450,
    value: 530,
    subtitle: "The Complete Player Setup",
    description:
      "Every essential. Built to match.",
    recommended: true,
    products: [
      "long-cuff-gloves",
      "sliding-mitt",
      "extended-elbow",
      "extended-leg",
      "hand-guard",
      "arm-sleeves",
    ],
  },
  {
    id: "dynasty-series",
    name: "Dynasty Series",
    price: 750,
    value: 855,
    subtitle: "The Complete Player Collection",
    description:
      "For players who keep a full batting glove rotation.",
    products: [
      "long-cuff-gloves",
      "short-cuff-gloves",
      "extended-elbow",
      "extended-leg",
      "hand-guard",
      "sliding-mitt",
      "arm-sleeves",
    ],
    quantities: {
      "long-cuff-gloves": 2,
      "short-cuff-gloves": 2,
      "arm-sleeves": 2,
    },
  },
];

function BundleImage({
  products,
  quantities = {},
  compact = false,
}: {
  products: Product[];
  quantities?: Record<string, number>;
  compact?: boolean;
}) {
  function shortName(product: Product) {
    return product.id === "long-cuff-gloves"
      ? "Long Cuff"
      : product.id === "short-cuff-gloves"
        ? "Short Cuff"
        : product.id === "sliding-mitt"
          ? "Sliding Mitt"
          : product.id === "extended-elbow"
            ? "Ext. Elbow"
            : product.id === "elbow-guard"
              ? "Elbow Guard"
              : product.id === "extended-leg"
                ? "Ext. Leg"
                : product.id === "hand-guard"
                  ? "Hand Guard"
                  : product.id === "arm-sleeves"
                    ? "Arm Sleeve"
                    : product.name;
  }

  return (
    <div
      className={`grid h-full w-full ${
        compact
          ? "grid-cols-2 gap-1 p-1.5"
          : "grid-cols-3 gap-2 p-4 sm:gap-3 sm:p-6"
      }`}
    >
      {products.map((product) => {
        const quantity = quantities[product.id] ?? 1;

        return (
          <div
            key={product.id}
            className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden bg-white"
          >
            {quantity > 1 && (
              <span
                className={`absolute right-1.5 top-1.5 z-10 flex items-center justify-center rounded-full bg-black font-black text-white ${
                  compact
                    ? "h-5 min-w-5 px-1 text-[7px]"
                    : "h-7 min-w-7 px-1.5 text-[9px]"
                }`}
              >
                ×{quantity}
              </span>
            )}

            <div className="flex min-h-0 w-full flex-1 items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className={`h-full w-full object-contain ${
                  compact ? "p-1" : "p-2"
                }`}
              />
            </div>

            {!compact &&
              [
                "long-cuff-gloves",
                "short-cuff-gloves",
                "sliding-mitt",
              ].includes(product.id) && (
                <span className="absolute bottom-[22px] left-0 whitespace-nowrap bg-black px-1.5 py-1 text-[4px] font-black uppercase tracking-[0.03em] text-white sm:bottom-[24px] sm:px-2 sm:text-[5px]">
                  Matching Storage Bag Included
                </span>
              )}

            {!compact && (
              <p className="mt-1 px-1 pb-2 text-center text-[7px] font-black uppercase leading-3 tracking-[0.04em] text-black/55 sm:text-[8px]">
                {shortName(product)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CountdownBar({
  deadline,
  status,
  primaryColor,
}: {
  deadline: string | null;
  status: "open" | "closed";
  primaryColor: string;
}) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    function update() {
      if (status === "closed" || !deadline) {
        setTimeLeft(0);
        return;
      }

      const remaining =
        new Date(deadline).getTime() - Date.now();

      setTimeLeft(Math.max(0, remaining));
    }

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, status]);

  const closed =
    status === "closed" ||
    (!!deadline && timeLeft <= 0);

  if (closed) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[95] border-t border-white/10 bg-black px-4 py-4 text-center text-white shadow-[0_-10px_34px_rgba(0,0,0,0.22)]">
        <p className="text-[10px] font-black uppercase tracking-[0.16em]">
          Team Order Window Closed
        </p>
      </div>
    );
  }

  if (!deadline) {
    return null;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) =>
    String(value).padStart(2, "0");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[95] border-t border-white/10 bg-black px-5 py-5 text-white shadow-[0_-10px_34px_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-5">
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full"
          style={{ backgroundColor: primaryColor }}
        />
        <span className="text-xs font-black uppercase tracking-[0.16em] text-white/75 sm:text-sm">
          {timeLeft <= 86400000 ? "Ordering Closes Today" : "Ordering Closes In"}
        </span>
        <div className="flex items-center gap-2 text-[22px] font-black tracking-[-0.02em] sm:text-[28px]">
          <span>{pad(days)}D</span>
          <span className="text-white/25">:</span>
          <span>{pad(hours)}H</span>
          <span className="text-white/25">:</span>
          <span>{pad(minutes)}M</span>
          <span className="text-white/25">:</span>
          <span>{pad(seconds)}S</span>
        </div>
      </div>
    </div>
  );
}

export default function TeamCollectionClient({
  team,
}: {
  team: Team;
}) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [playersLoadError, setPlayersLoadError] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [manualPlayerName, setManualPlayerName] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [selectedBundleId, setSelectedBundleId] = useState("legacy-series");
  const [manualSizes, setManualSizes] = useState<Record<string, string>>({});
  const [sizePickerItem, setSizePickerItem] = useState<Product | Bundle | null>(null);
  const [sizePickerAction, setSizePickerAction] = useState<"cart" | "buy" | null>(null);

  const primaryColor =
    team.colors?.primary || "#111111";
  const secondaryColor =
    team.colors?.secondary || "#f5f5f3";

  const productMap = useMemo(
    () =>
      Object.fromEntries(
        PRODUCTS.map((product) => [
          product.id,
          product,
        ])
      ),
    []
  );

  const selectedPlayer =
    players.find(
      (player) =>
        player.id === selectedPlayerId
    ) ?? null;

  useEffect(() => {
    let cancelled = false;

    async function loadPlayers() {
      setPlayersLoading(true);
      setPlayersLoadError("");

      let lastError = "";

      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const response = await fetch(
            `/api/team-players?teamId=${encodeURIComponent(team.id)}`,
            {
              cache: "no-store",
              credentials: "same-origin",
              headers: {
                Accept: "application/json",
              },
            }
          );

          const result = await response.json().catch(() => null);

          if (!response.ok) {
            throw new Error(
              result?.error || `Unable to load players (${response.status}).`
            );
          }

          if (!cancelled) {
            setPlayers(
              Array.isArray(result?.players)
                ? result.players
                : []
            );
            setPlayersLoadError("");
            setPlayersLoading(false);
          }

          return;
        } catch (error) {
          lastError =
            error instanceof Error
              ? error.message
              : "Unable to load saved players.";

          if (attempt < 2) {
            await new Promise((resolve) =>
              window.setTimeout(resolve, 400)
            );
          }
        }
      }

      if (!cancelled) {
        console.error("Saved player load failed:", lastError);
        setPlayersLoadError(lastError || "Unable to load saved players.");
        setPlayersLoading(false);
      }
    }

    loadPlayers();

    return () => {
      cancelled = true;
    };
  }, [team.id]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get(
        "checkout"
      ) === "success"
    ) {
      setCart([]);
      setCartOpen(false);
    }
  }, []);

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const orderClosed =
    team.order_status === "closed" ||
    (!!team.order_deadline &&
      new Date(team.order_deadline).getTime() <= Date.now());

  const effectivePlayerName =
    selectedPlayer?.name ||
    manualPlayerName.trim() ||
    "";

  function retrySavedPlayers() {
    setPlayersLoadError("");
    setPlayersLoading(true);

    fetch(
      `/api/team-players?teamId=${encodeURIComponent(team.id)}&retry=${Date.now()}`,
      {
        cache: "no-store",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then(async (response) => {
        const result = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            result?.error || `Unable to load players (${response.status}).`
          );
        }

        setPlayers(
          Array.isArray(result?.players)
            ? result.players
            : []
        );
        setPlayersLoadError("");
      })
      .catch((error) => {
        setPlayersLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load saved players."
        );
      })
      .finally(() => {
        setPlayersLoading(false);
      });
  }

  function fittedSizeForProduct(
    productId: string
  ): string {
    const sizes =
      selectedPlayer?.fitted_sizes ?? {};

    const keyByProduct: Record<string, string> = {
      "long-cuff-gloves": "battingGloves",
      "short-cuff-gloves": "battingGloves",
      "sliding-mitt": "slidingMitt",
      "extended-elbow": "extendedElbowGuard",
      "elbow-guard": "elbowGuard",
      "extended-leg": "extendedLegGuard",
      "hand-guard": "handGuard",
      "arm-sleeves": "armSleeve",
    };

    const key = keyByProduct[productId];
    return key ? String(sizes[key] ?? "").trim() : "";
  }

  function formatFittedSize(value: string): string {
    const normalized = value.trim().toUpperCase();

    const labels: Record<string, string> = {
      YS: "Youth S",
      YM: "Youth M",
      YL: "Youth L",
      YXL: "Youth XL",
      AS: "Adult S",
      AM: "Adult M",
      AL: "Adult L",
      AXL: "Adult XL",
      Y: "Youth",
      A: "Adult",
    };

    return labels[normalized] ?? value;
  }

  function bundleFitItems(
    bundle: Bundle
  ): Array<{
    name: string;
    size: string;
  }> {
    if (!selectedPlayer) return [];

    return bundle.products
      .map((productId) => {
        const product = productMap[productId];
        const size =
          fittedSizeForProduct(productId);

        if (!product || !size) return null;

        return {
          name:
            productId === "arm-sleeves"
              ? "Arm Sleeve"
              : product.name
                .replace(
                  "Batting Gloves",
                  "Gloves"
                )
                .replace(
                  "Extended Protection Elbow Guard",
                  "Ext. Elbow Guard"
                )
                .replace(
                  "Extended Protection Leg Guard",
                  "Ext. Leg Guard"
                ),
          size: formatFittedSize(size),
        };
      })
      .filter(
        (
          item
        ): item is {
          name: string;
          size: string;
        } => Boolean(item)
      );
  }

  const sizeOptionsByProduct: Record<string, string[]> = {
    "long-cuff-gloves": ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
    "short-cuff-gloves": ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
    "sliding-mitt": ["Youth", "Adult S", "Adult M", "Adult L", "Adult XL"],
    "extended-elbow": ["Youth", "Adult"],
    "elbow-guard": ["Youth", "Adult"],
    "extended-leg": ["Youth", "Adult"],
    "hand-guard": ["Youth", "Adult"],
    "arm-sleeves": ["Youth", "Adult"],
  };

  function requiredProductsForItem(item: Product | Bundle): Product[] {
    if ("products" in item) {
      return item.products
        .map((id) => productMap[id])
        .filter(Boolean) as Product[];
    }
    return [item];
  }

  function manualSizesComplete(item: Product | Bundle) {
    return requiredProductsForItem(item).every(
      (product) => Boolean(manualSizes[product.id])
    );
  }

  function requestAddToCart(item: Product | Bundle) {
    if (selectedPlayer) {
      addToCart(item);
      return;
    }
    setSizePickerItem(item);
    setSizePickerAction("cart");
  }

  function requestBuyNow(item: Product | Bundle) {
    if (selectedPlayer) {
      void buyNow(item);
      return;
    }
    setSizePickerItem(item);
    setSizePickerAction("buy");
  }

  async function confirmManualSizes() {
    if (!sizePickerItem || !sizePickerAction || !manualSizesComplete(sizePickerItem)) {
      return;
    }

    const item = sizePickerItem;
    const action = sizePickerAction;

    setSizePickerItem(null);
    setSizePickerAction(null);

    if (action === "cart") {
      addToCart(item);
    } else {
      await buyNow(item);
    }
  }

  function showAdded(name: string) {
    setAddedMessage(`${name} added to cart`);
    window.setTimeout(
      () => setAddedMessage(""),
      1600
    );
  }

  function addToCart(
    item: Product | Bundle
  ) {
    if (orderClosed) return;

    const image =
      "image" in item
        ? item.image
        : productMap[
            item.products[0]
          ]?.image || "";

    setCart((current) => {
      const existing = current.find(
        (cartItem) =>
          cartItem.id === item.id
      );

      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...current,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image,
          quantity: 1,
        },
      ];
    });

    showAdded(item.name);
  }

  function removeFromCart(id: string) {
    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function changeQuantity(
    id: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  }

  async function buyNow(
    item: Product | Bundle
  ) {
    if (orderClosed) return;

    const image =
      "image" in item
        ? item.image
        : productMap[
            item.products[0]
          ]?.image || "";

    await startCheckout([
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image,
        quantity: 1,
      },
    ]);
  }

  async function checkoutCart() {
    if (!cart.length || orderClosed) {
      return;
    }

    await startCheckout(cart);
  }

  async function startCheckout(
    items: CartItem[]
  ) {
    try {
      setCheckoutLoading(true);

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            teamId: team.id,
            teamName: team.name,
            teamSlug: team.slug,
            playerName:
              effectivePlayerName || null,
            fittedSizes:
              selectedPlayer?.fitted_sizes ??
              manualSizes,
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to start checkout."
        );
      }

      if (!result.url) {
        throw new Error(
          "Stripe checkout URL was not returned."
        );
      }

      window.location.href = result.url;
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to start checkout."
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <main className={`min-h-screen bg-[#f5f5f3] text-black ${cartCount > 0 ? "pb-44 sm:pb-48" : "pb-28"}`}>

      <header className="bg-black text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-[11px] font-black uppercase tracking-[0.25em]"
          >
            KUSTOM BASEBALL
          </a>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/70 hover:text-white"
          >
            <span>Cart</span>

            {cartCount > 0 && (
              <span
                className="flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-[9px] text-black"
                style={{
                  backgroundColor:
                    secondaryColor,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <CountdownBar
        deadline={team.order_deadline}
        status={team.order_status}
        primaryColor={primaryColor}
      />

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1000px] px-6 py-8 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <div
              className="mb-5 h-1 w-14"
              style={{ backgroundColor: primaryColor }}
            />

            {team.primary_logo && (
              <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                <img
                  src={team.primary_logo}
                  alt={`${team.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            <p
              className="mt-4 text-[9px] font-black uppercase tracking-[0.28em]"
              style={{
                color: primaryColor,
              }}
            >
              {team.season
                ? `${team.season} Team Collection`
                : "Team Collection"}
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-5xl">
              {team.name}
            </h1>

            {team.age_group && (
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-black/40">
                {team.age_group}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 py-8 sm:py-10">
        <div className="border border-black/10 bg-white p-5 sm:p-6">
          <label className="block text-[9px] font-black uppercase tracking-[0.16em] text-black/45">
            Select Player
          </label>

          {playersLoading ? (
            <div className="mt-2 flex h-12 w-full items-center border border-black/15 bg-[#fafaf8] px-4 text-sm font-semibold text-black/40">
              Loading saved players...
            </div>
          ) : playersLoadError ? (
            <div className="mt-2 flex min-h-12 items-center justify-between gap-3 border border-black/15 bg-[#fafaf8] px-4 py-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.08em]">
                  Saved players didn&apos;t load
                </p>
                <p className="mt-1 text-[9px] text-black/45">
                  {playersLoadError}
                </p>
              </div>

              <button
                type="button"
                onClick={retrySavedPlayers}
                className="shrink-0 border border-black px-3 py-2 text-[8px] font-black uppercase tracking-[0.1em]"
              >
                Retry
              </button>
            </div>
          ) : players.length > 0 ? (
            <select
              value={selectedPlayerId}
              onChange={(event) =>
                setSelectedPlayerId(
                  event.target.value
                )
              }
              className="mt-2 h-12 w-full border border-black/15 bg-white px-4 text-sm font-semibold outline-none focus:border-black"
            >
              <option value="">
                Select player
              </option>
              {players.map((player) => (
                <option
                  key={player.id}
                  value={player.id}
                >
                  {player.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={manualPlayerName}
              onChange={(event) =>
                setManualPlayerName(
                  event.target.value
                )
              }
              placeholder="Player name (optional)"
              className="mt-2 h-12 w-full border border-black/15 bg-white px-4 text-sm font-semibold outline-none focus:border-black"
            />
          )}

          {!playersLoading &&
            players.length > 0 &&
            !selectedPlayer && (
              <p className="mt-2 text-[9px] text-black/40">
                Loads fitted sizes automatically.
              </p>
            )}

          {selectedPlayer && (
            <div
              className="mt-3 border border-black/10 bg-[#fafaf8] px-4 py-3"
              style={{
                borderLeftWidth: "3px",
                borderLeftColor: primaryColor,
              }}
            >
              <p className="text-sm font-black uppercase">
                {selectedPlayer.name}
              </p>

              <p className="mt-1 text-[10px] text-black/45">
                {`${selectedPlayer.name.split(" ")[0]}'s fitted sizes have been selected for you.`}
              </p>
            </div>
          )}

          {!playersLoading &&
            players.length > 0 &&
            !selectedPlayer && (
              <p className="mt-2 text-[9px] text-black/35">
                Player not listed? You can enter sizes when ordering.
              </p>
            )}

          {!playersLoading &&
            !playersLoadError &&
            players.length === 0 && (
              <p className="mt-2 text-[9px] text-black/35">
                No saved players found. Enter the player name and choose sizes when ordering.
              </p>
            )}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-12 sm:pb-16">
        <div className="mb-4">
          <p
            className="text-[10px] font-black uppercase tracking-[0.25em]"
            style={{ color: primaryColor }}
          >
            Team Sets
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Choose Your Setup
          </h2>
        </div>

        {/* MOBILE-FIRST SERIES COMPARISON */}
        <div className="mb-5">

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {BUNDLES.map((bundle) => {
              const bundleProducts = bundle.products
                .map((id) => productMap[id])
                .filter(Boolean) as Product[];

              const active = selectedBundleId === bundle.id;

              return (
                <button
                  key={bundle.id}
                  type="button"
                  onClick={() => setSelectedBundleId(bundle.id)}
                  className={`relative overflow-hidden border bg-white text-left transition ${
                    active
                      ? "border-black shadow-[0_5px_20px_rgba(0,0,0,0.07)]"
                      : "border-black/10"
                  }`}
                >
                  {bundle.recommended && (
                    <div
                      className="absolute left-0 right-0 top-0 z-20 py-1.5 text-center text-[6px] font-black uppercase tracking-[0.11em] text-white sm:text-[8px]"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Most Popular
                    </div>
                  )}

                  {/* At-a-glance picture of everything in the Series */}
                  <div
                    className={`h-[128px] bg-[#f1f1ef] sm:h-[165px] ${
                      bundle.recommended ? "pt-4 sm:pt-5" : ""
                    }`}
                  >
                    <BundleImage
                      products={bundleProducts}
                      quantities={bundle.quantities}
                      compact
                    />
                  </div>

                  <div className="px-2.5 pb-3 pt-2.5 text-center sm:px-4 sm:pb-4">
                    <p className="truncate text-[7px] font-black uppercase tracking-[0.04em] text-black/60 sm:text-[10px]">
                      {bundle.name.replace(" Series", "")}
                    </p>
                    <p className="mt-1 text-lg font-black leading-none sm:text-2xl">
                      ${bundle.price}
                    </p>
                    <p className="mt-1 text-[6px] font-semibold leading-3 text-black/35 sm:text-[8px]">
                      ${bundle.value} individually
                    </p>
                    <p
                      className="mt-1.5 text-[6px] font-black uppercase tracking-[0.05em] sm:text-[8px]"
                      style={{
                        color: bundle.recommended ? primaryColor : "rgba(0,0,0,0.38)",
                      }}
                    >
                      {bundle.id === "armor-series"
                        ? "Protection"
                        : bundle.id === "legacy-series"
                          ? "Complete Setup"
                          : "Full Rotation"}
                    </p>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-[3px] w-full ${
                      active ? "" : "opacity-0"
                    }`}
                    style={{ backgroundColor: primaryColor }}
                  />
                </button>
              );
            })}
          </div>

        </div>

        {/* ONE EXPANDED SERIES AT A TIME */}
        {BUNDLES.filter((bundle) => bundle.id === selectedBundleId).map(
          (bundle) => {
            const bundleProducts = bundle.products
              .map((id) => productMap[id])
              .filter(Boolean) as Product[];

            return (
              <article
                key={bundle.id}
                className="relative overflow-hidden border border-black/10 bg-white"
              >
                {bundle.recommended && (
                  <div className="px-5 pt-5 sm:px-7 sm:pt-6">
                    <span
                      className="inline-block px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-5 pb-0 sm:p-7 sm:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="">
                      <h3 className="text-xl font-black uppercase sm:text-2xl">
                        {bundle.name}
                      </h3>

                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.08em] text-black/65 sm:text-xs">
                        {bundle.subtitle}
                      </p>

                      <p className="mt-2 max-w-[520px] text-xs leading-5 text-black/45 sm:text-sm">
                        {bundle.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-3xl font-black leading-none sm:text-4xl">
                        ${bundle.price}
                      </p>
                      <p className="mt-1 text-[8px] font-semibold text-black/35 sm:text-[10px]">
                        ${bundle.value} if purchased individually
                      </p>
                    </div>
                  </div>
                </div>

                {/* Large picture of everything included directly above purchase details */}
                <div className="mt-5 h-[270px] bg-[#f1f1ef] sm:h-[360px]">
                  <BundleImage
                    products={bundleProducts}
                    quantities={bundle.quantities}
                  />
                </div>

                <div className="p-5 pt-0 sm:p-7 sm:pt-0">
                  {bundle.id === "dynasty-series" && (
                    <div className="mt-4 border border-black/10 bg-[#fafaf8] px-4 py-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-black/55">
                        Batting Glove Rotation
                      </p>
                      <p className="mt-1 text-[10px] leading-5 text-black/45">
                        2 Long Cuff pairs · 2 Short Cuff pairs · 2 Arm Sleeves · Complete Protection
                      </p>
                    </div>
                  )}

                  {selectedPlayer && bundleFitItems(bundle).length > 0 && (
                    <div
                      className="mt-4 border border-black/10 bg-white p-4"
                      style={{
                        borderTopColor: primaryColor,
                        borderTopWidth: "2px",
                      }}
                    >
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                        {selectedPlayer.name.split(" ")[0]}&apos;s Fitted Sizes
                      </p>

                      <p className="mt-1 text-[9px] text-black/40">
                        {`${selectedPlayer.name.split(" ")[0]}'s fitted sizes have been selected for you.`}
                      </p>

                      <p className="mt-3 text-[9px] leading-5 text-black/70">
                        {bundleFitItems(bundle)
                          .map(
                            (item) =>
                              `${item.name}: ${item.size}`
                          )
                          .join(" · ")}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={orderClosed || checkoutLoading}
                    onClick={() => requestBuyNow(bundle)}
                    className="mt-5 w-full bg-black px-4 py-4 text-[9px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {orderClosed
                      ? "Ordering Closed"
                      : checkoutLoading
                        ? "Opening Checkout..."
                        : "Buy Now"}
                  </button>

                  <button
                    type="button"
                    disabled={orderClosed}
                    onClick={() => requestAddToCart(bundle)}
                    className="mt-2 w-full border border-black bg-white px-4 py-3 text-[9px] font-black uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {orderClosed
                      ? "Ordering Closed"
                      : "Add to Cart"}
                  </button>
                </div>
              </article>
            );
          }
        )}
      </section>

      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-7 sm:pb-16 sm:pt-10">
          <div className="mb-6">
            <p
              className="text-[10px] font-black uppercase tracking-[0.25em]"
              style={{ color: primaryColor }}
            >
              Individual Gear
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Shop Individually
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {PRODUCTS.map((product) => {
              const fittedSize =
                fittedSizeForProduct(product.id);

              return (
                <article
                  key={product.id}
                  className="overflow-hidden border border-black/10 bg-white"
                >
                  <div className="relative flex aspect-[1/0.9] items-center justify-center bg-[#f5f5f3] p-5 sm:p-7">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />

                    {[
                      "long-cuff-gloves",
                      "short-cuff-gloves",
                      "sliding-mitt",
                    ].includes(product.id) && (
                      <span className="absolute bottom-0 left-0 whitespace-nowrap bg-black px-2 py-1.5 text-[5px] font-black uppercase tracking-[0.04em] text-white sm:px-3 sm:py-2 sm:text-[7px] sm:tracking-[0.06em]">
                        Matching Storage Bag Included
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="min-h-[32px] text-[10px] font-black uppercase leading-4 sm:text-xs">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-[20px] font-black leading-none tracking-[-0.02em] sm:text-[22px]">
                        ${product.price}
                      </p>

                      {selectedPlayer && fittedSize && (
                        <span className="border border-black/10 bg-[#f8f8f6] px-2 py-1 text-[8px] font-black uppercase">
                          Size {formatFittedSize(fittedSize)}
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={orderClosed}
                        onClick={() =>
                          requestAddToCart(product)
                        }
                        className="w-full bg-black px-3 py-3.5 text-[8px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {orderClosed
                          ? "Ordering Closed"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {sizePickerItem && !selectedPlayer && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/45 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close size selection"
            onClick={() => {
              setSizePickerItem(null);
              setSizePickerAction(null);
            }}
            className="absolute inset-0"
          />

          <div className="relative z-10 max-h-[86vh] w-full overflow-y-auto bg-white p-5 shadow-2xl sm:max-w-[520px] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[9px] font-black uppercase tracking-[0.18em]"
                  style={{ color: primaryColor }}
                >
                  Manual Sizing
                </p>
                <h3 className="mt-1 text-2xl font-black uppercase tracking-tight">
                  Select Your Sizes
                </h3>
                <p className="mt-2 text-[10px] leading-5 text-black/45">
                  No player selected. Choose the sizes needed for this order.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSizePickerItem(null);
                  setSizePickerAction(null);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-black/10 text-lg"
              >
                ×
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {requiredProductsForItem(sizePickerItem).map((product) => (
                <label key={product.id} className="block">
                  <span className="text-[9px] font-black uppercase tracking-[0.08em] text-black/60">
                    {product.name}
                  </span>
                  <select
                    value={manualSizes[product.id] ?? ""}
                    onChange={(event) =>
                      setManualSizes((current) => ({
                        ...current,
                        [product.id]: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-11 w-full border border-black/15 bg-white px-3 text-sm font-semibold outline-none focus:border-black"
                  >
                    <option value="">Select size</option>
                    {(sizeOptionsByProduct[product.id] ?? ["Youth", "Adult"]).map(
                      (size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      )
                    )}
                  </select>
                </label>
              ))}
            </div>

            <button
              type="button"
              disabled={!manualSizesComplete(sizePickerItem) || checkoutLoading}
              onClick={() => void confirmManualSizes()}
              className="mt-5 w-full px-4 py-4 text-[9px] font-black uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-35"
              style={{ backgroundColor: primaryColor }}
            >
              {!manualSizesComplete(sizePickerItem)
                ? "Select All Sizes"
                : sizePickerAction === "buy"
                  ? `Continue to Checkout — $${sizePickerItem.price}`
                  : `Add to Cart — $${sizePickerItem.price}`}
            </button>
          </div>
        </div>
      )}

      {addedMessage && !cartOpen && (
        <div className="fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 bg-black px-4 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-xl">
          {addedMessage}
        </div>
      )}



      {cartCount > 0 && !cartOpen && (
        <div className="fixed bottom-[76px] left-0 right-0 z-[94] border-t border-black/10 bg-white/97 px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.10)] backdrop-blur sm:bottom-[84px]">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[0.14em] text-black/40">
                Your Cart
              </p>
              <p className="mt-0.5 text-base font-black leading-none text-black sm:text-lg">
                ${cartTotal.toFixed(2)} CAD
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="shrink-0 bg-black px-5 py-3 text-[9px] font-black uppercase tracking-[0.13em] text-white transition hover:bg-black/85"
            >
              View Cart · {cartCount}
            </button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
                  {team.name}
                </p>
                <h2 className="mt-1 text-2xl font-black uppercase">
                  Your Cart
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCartOpen(false)
                }
                className="text-2xl text-black/40 hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {selectedPlayer ? (
                <div
                  className="mb-4 border border-black/10 px-4 py-3"
                  style={{
                    borderLeftColor:
                      primaryColor,
                  }}
                >
                  <p className="text-sm font-black uppercase">
                    {selectedPlayer.name}
                  </p>
                  <p className="mt-1 text-[9px] text-black/40">
                    Fitted sizes selected
                  </p>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                    Player name (optional)
                  </label>
                  <input
                    value={manualPlayerName}
                    onChange={(event) =>
                      setManualPlayerName(
                        event.target.value
                      )
                    }
                    placeholder="John S."
                    className="mt-2 h-11 w-full border border-black/15 px-3 text-sm outline-none focus:border-black"
                  />
                </div>
              )}

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-black/10 py-4 first:pt-0"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#f5f5f3] p-2">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <h3 className="text-[10px] font-black uppercase leading-4">
                        {item.name}
                      </h3>
                      <p className="shrink-0 text-sm font-black">
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-black/10">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-2"
                        >
                          −
                        </button>
                        <span className="px-3 text-[10px] font-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-2"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="text-[8px] font-black uppercase tracking-[0.12em] text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {!cart.length && (
                <div className="py-20 text-center text-xs font-black uppercase">
                  Your cart is empty
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/10 bg-[#f8f8f6] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-black">
                    ${cartTotal.toFixed(2)} CAD
                  </span>
                </div>

                <button
                  type="button"
                  onClick={checkoutCart}
                  disabled={
                    checkoutLoading ||
                    orderClosed
                  }
                  className="mt-4 w-full px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    backgroundColor:
                      primaryColor,
                  }}
                >
                  {checkoutLoading
                    ? "Opening Stripe..."
                    : "Checkout"}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <footer className="border-t border-black/10 bg-black px-6 py-8 text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
            Kustom Baseball
          </p>
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
            {team.name}
          </p>
        </div>
      </footer>
    </main>
  );
}