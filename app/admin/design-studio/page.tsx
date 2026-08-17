"use client";

import {
  useEffect,
  useMemo,
  useState,
  type PointerEvent,
} from "react";

type ColorKey =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral";

type LogoPosition = {
  x: number;
  y: number;
  size: number;
  rotation: number;
};

type Logo = {
  id: string;
  name: string;
  organization: string;
  image: string;
  createdAt: string;
};

type TeamProfile = {
  id: string;
  name: string;
  organization: string | null;
  ageGroup: string | null;
  season: string | null;
  colors: Record<ColorKey, string>;
  primaryLogo: string | null;
  secondaryLogo: string | null;
  orderDeadline: string | null;
  orderStatus: "open" | "closed";
  createdAt: string;
  updatedAt: string;
};

type SavedDesign = {
  id: string;
  name: string;
  organization: string;
  description: string;
  colors: Record<ColorKey, string>;
  regionAssignments: Record<string, ColorKey>;
  primaryLogo: string | null;
  secondaryLogo: string | null;
  mainLogo: LogoPosition;
  upperStrapLogo: LogoPosition;
  lowerStrapLogo: LogoPosition;
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

type FittedSizes = {
  battingGloves: string;
  slidingMitt: string;
  extendedElbowGuard: string;
  elbowGuard: string;
  extendedLegGuard: string;
  handGuard: string;
  armSleeve: string;
};

type TeamPlayer = {
  id: string;
  playerName: string;
  fittedSizes: FittedSizes;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

const EMPTY_FITTED_SIZES: FittedSizes = {
  battingGloves: "",
  slidingMitt: "",
  extendedElbowGuard: "",
  elbowGuard: "",
  extendedLegGuard: "",
  handGuard: "",
  armSleeve: "",
};

const PLAYER_FIELDS: Array<{
  key: keyof FittedSizes;
  label: string;
}> = [
  {
    key: "battingGloves",
    label: "Batting Gloves",
  },
  {
    key: "slidingMitt",
    label: "Sliding Mitt",
  },
  {
    key: "extendedElbowGuard",
    label: "Ext. Elbow Guard",
  },
  {
    key: "elbowGuard",
    label: "Elbow Guard",
  },
  {
    key: "extendedLegGuard",
    label: "Ext. Leg Guard",
  },
  {
    key: "handGuard",
    label: "Hand Guard",
  },
  {
    key: "armSleeve",
    label: "Arm Sleeve",
  },
];

const FITTING_OPTIONS: Record<keyof FittedSizes, string[]> = {
  battingGloves: ["YS", "YM", "YL", "YXL", "AS", "AM", "AL", "AXL"],
  slidingMitt: ["Y", "A"],
  extendedElbowGuard: ["Y", "A"],
  elbowGuard: ["Y", "A"],
  extendedLegGuard: ["Y", "A"],
  handGuard: ["Y", "A"],
  armSleeve: ["Y", "A"],
};

function FittingOptionPicker({
  field,
  value,
  onChange,
}: {
  field: { key: keyof FittedSizes; label: string };
  value: string;
  onChange: (value: string) => void;
}) {
  const options = FITTING_OPTIONS[field.key];

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[9px] font-black uppercase tracking-[0.1em] text-black/45">
          {field.label}
        </p>
        <span
          className={`text-[9px] font-black uppercase tracking-[0.08em] ${
            value ? "text-black" : "text-black/25"
          }`}
        >
          {value || "Not set"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`min-w-[44px] border px-3 py-2 text-[9px] font-black uppercase tracking-[0.08em] transition ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-black/15 bg-[#f8f8f6] text-black hover:border-black hover:bg-white"
              }`}
            >
              {option}
            </button>
          );
        })}

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="border border-transparent px-2 py-2 text-[8px] font-black uppercase tracking-[0.08em] text-black/35 hover:text-black"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

const PATH =
  "/images/Products/elbow-guards/extended/";

const PRODUCT = {
  shell:
    `${PATH}extendedelbowguardshell.png`,
  lining:
    `${PATH}Extendedelbowguardlining.png`,
  straps:
    `${PATH}extendedelbowguardstraps.png`,
};

const MASK =
  `${PATH}shell_mask_tight.png`;

const DEFAULT_COLORS: Record<
  ColorKey,
  string
> = {
  primary: "#7BB7E8",
  secondary: "#FFD400",
  accent: "#172B4D",
  neutral: "#FFFFFF",
};

const DEFAULT_MAIN: LogoPosition = {
  x: 50,
  y: 67,
  size: 17,
  rotation: -8,
};

const DEFAULT_UPPER: LogoPosition = {
  x: 57,
  y: 43,
  size: 8,
  rotation: -8,
};

const DEFAULT_LOWER: LogoPosition = {
  x: 57,
  y: 57,
  size: 8,
  rotation: -8,
};

const DESIGNS = [
  {
    id: "design-01",
    name: "Design 01",
    description: "Classic · 2 colors",
    colors: 2,
  },
  {
    id: "design-02",
    name: "Design 02",
    description: "Pro · 3 colors",
    colors: 3,
  },
  {
    id: "design-03",
    name: "Design 03",
    description: "Full · 4 colors",
    colors: 4,
  },
];

/* -------------------------------------------------------------------------- */
/* TEXTURED PRODUCT LAYER                                                     */
/* -------------------------------------------------------------------------- */

function TexturedProductLayer({
  image,
  color,
  zIndex,
  shell = false,
}: {
  image: string;
  color: string;
  zIndex: number;
  shell?: boolean;
}) {
  const hex = color
    .replace("#", "")
    .padEnd(6, "0");

  const filterId =
    `texture-${zIndex}-${hex}`;

  const r =
    parseInt(hex.slice(0, 2), 16) / 255;

  const g =
    parseInt(hex.slice(2, 4), 16) / 255;

  const b =
    parseInt(hex.slice(4, 6), 16) / 255;

  const matrix = `
    ${0.2126 * r} ${0.7152 * r} ${0.0722 * r} 0 0
    ${0.2126 * g} ${0.7152 * g} ${0.0722 * g} 0 0
    ${0.2126 * b} ${0.7152 * b} ${0.0722 * b} 0 0
    0 0 0 1 0
  `;

  return (
    <>
      <svg
        className="absolute h-0 w-0"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feColorMatrix
              type="matrix"
              values={matrix}
              result="baseColor"
            />

            <feComponentTransfer
              in="baseColor"
            >
              <feFuncR
                type="gamma"
                amplitude="1"
                exponent="0.90"
              />

              <feFuncG
                type="gamma"
                amplitude="1"
                exponent="0.90"
              />

              <feFuncB
                type="gamma"
                amplitude="1"
                exponent="0.90"
              />

              <feFuncA type="identity" />
            </feComponentTransfer>
          </filter>

          <filter
            id={`${filterId}-detail`}
            colorInterpolationFilters="sRGB"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feColorMatrix
              type="saturate"
              values="0"
            />

            <feComponentTransfer>
              <feFuncR
                type="gamma"
                amplitude="1.08"
                exponent="0.72"
                offset="-0.02"
              />

              <feFuncG
                type="gamma"
                amplitude="1.08"
                exponent="0.72"
                offset="-0.02"
              />

              <feFuncB
                type="gamma"
                amplitude="1.08"
                exponent="0.72"
                offset="-0.02"
              />

              <feFuncA type="identity" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex,

          ...(shell
            ? {
                WebkitMaskImage:
                  `url("${MASK}")`,
                maskImage:
                  `url("${MASK}")`,
                WebkitMaskSize:
                  "100% 100%",
                maskSize:
                  "100% 100%",
                WebkitMaskPosition:
                  "center",
                maskPosition:
                  "center",
                WebkitMaskRepeat:
                  "no-repeat",
                maskRepeat:
                  "no-repeat",
                WebkitMaskMode:
                  "luminance",
                maskMode:
                  "luminance",
              }
            : {}),
        }}
      >
        <img
          src={image}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            filter:
              `url(#${filterId})`,
          }}
        />

        <img
          src={image}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain opacity-[0.13] mix-blend-soft-light"
          style={{
            filter:
              `url(#${filterId}-detail)`,
          }}
        />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDER                                                                     */
/* -------------------------------------------------------------------------- */

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-[9px] font-black uppercase tracking-[0.12em] text-black/50">
          {label}
        </span>

        <span className="font-mono text-[10px] text-black/50">
          {Number.isInteger(value)
            ? value
            : value.toFixed(1)}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="w-full cursor-pointer accent-black"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LOGO CONTROL                                                               */
/* -------------------------------------------------------------------------- */

function LogoControl({
  title,
  logo,
  position,
  setPosition,
  minSize,
  maxSize,
  reset,
}: {
  title: string;
  logo: string | null;
  position: LogoPosition;
  setPosition: (
    callback: (
      position: LogoPosition
    ) => LogoPosition
  ) => void;
  minSize: number;
  maxSize: number;
  reset: () => void;
}) {
  if (!logo) {
    return (
      <div className="rounded-xl border border-black/10 p-5">
        <p className="text-xs font-black uppercase">
          {title}
        </p>

        <p className="mt-4 text-[10px] text-black/30">
          Add a logo first.
        </p>
      </div>
    );
  }

  const update = (
    key: keyof LogoPosition,
    value: number
  ) => {
    setPosition(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
  };

  return (
    <div className="rounded-xl border border-black/10 p-5">
      <p className="text-xs font-black uppercase">
        {title}
      </p>

      <div className="mt-5 space-y-5">
        <Slider
          label="Horizontal"
          value={position.x}
          min={0}
          max={100}
          step={0.5}
          suffix="%"
          onChange={(value) =>
            update("x", value)
          }
        />

        <Slider
          label="Vertical"
          value={position.y}
          min={0}
          max={100}
          step={0.5}
          suffix="%"
          onChange={(value) =>
            update("y", value)
          }
        />

        <Slider
          label="Logo Size"
          value={position.size}
          min={minSize}
          max={maxSize}
          step={0.25}
          suffix="%"
          onChange={(value) =>
            update("size", value)
          }
        />

        <Slider
          label="Rotation"
          value={position.rotation}
          min={-180}
          max={180}
          step={1}
          suffix="°"
          onChange={(value) =>
            update("rotation", value)
          }
        />

        <button
          type="button"
          onClick={reset}
          className="w-full border bg-[#f5f5f3] px-4 py-3 text-[9px] font-black uppercase"
        >
          Reset Position
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function DesignStudioPage() {
  const [
    section,
    setSection,
  ] = useState<
    "studio" |
    "teams" |
    "designs" |
    "logos"
  >("studio");

  const [
    organizationName,
    setOrganizationName,
  ] = useState(
    "Kitchener Panthers"
  );

  const [colors, setColors] =
    useState<
      Record<ColorKey, string>
    >({
      ...DEFAULT_COLORS,
    });

  const [
    primaryLogo,
    setPrimaryLogo,
  ] = useState<string | null>(
    null
  );

  const [
    secondaryLogo,
    setSecondaryLogo,
  ] = useState<string | null>(
    null
  );

  const [
    selectedDesignId,
    setSelectedDesignId,
  ] = useState(
    "design-01"
  );

  const [
    regionAssignments,
    setRegionAssignments,
  ] = useState<
    Record<string, ColorKey>
  >({
    Shell: "primary",
    Straps: "secondary",
    Lining: "secondary",
  });

  const [
    mainLogo,
    setMainLogo,
  ] = useState<LogoPosition>({
    ...DEFAULT_MAIN,
  });

  const [
    upperStrapLogo,
    setUpperStrapLogo,
  ] = useState<LogoPosition>({
    ...DEFAULT_UPPER,
  });

  const [
    lowerStrapLogo,
    setLowerStrapLogo,
  ] = useState<LogoPosition>({
    ...DEFAULT_LOWER,
  });

  const [
    logoControlsOpen,
    setLogoControlsOpen,
  ] = useState(false);

  const [saved, setSaved] =
    useState(false);

  const [
    editingDesignId,
    setEditingDesignId,
  ] = useState<string | null>(
    null
  );

  const [
    savedLogos,
    setSavedLogos,
  ] = useState<Logo[]>([]);

  const [
    savedDesigns,
    setSavedDesigns,
  ] = useState<SavedDesign[]>([]);

  const [
    teamProfiles,
    setTeamProfiles,
  ] = useState<TeamProfile[]>(
    []
  );

  const [
    logoSearch,
    setLogoSearch,
  ] = useState("");

  const [
    designSearch,
    setDesignSearch,
  ] = useState("");

  const [
    saveDesignOpen,
    setSaveDesignOpen,
  ] = useState(false);

  const [
    designName,
    setDesignName,
  ] = useState("");

  const [
    designOrganization,
    setDesignOrganization,
  ] = useState(
    "Kitchener Panthers"
  );

  const [
    designDescription,
    setDesignDescription,
  ] = useState("");

  const [
    saveLogoOpen,
    setSaveLogoOpen,
  ] = useState(false);

  const [
    logoToSave,
    setLogoToSave,
  ] = useState<string | null>(
    null
  );

  const [
    logoName,
    setLogoName,
  ] = useState("");

  const [
    logoOrganization,
    setLogoOrganization,
  ] = useState(
    "Kitchener Panthers"
  );

  const [
    teamEditorOpen,
    setTeamEditorOpen,
  ] = useState(false);

  const [
    editingTeamId,
    setEditingTeamId,
  ] = useState<string | null>(null);

  const [
    teamOrganization,
    setTeamOrganization,
  ] = useState("Kitchener Panthers");

  const [
    teamName,
    setTeamName,
  ] = useState("");

  const [
    teamAgeGroup,
    setTeamAgeGroup,
  ] = useState("");

  const [
    teamSeason,
    setTeamSeason,
  ] = useState(
    new Date().getFullYear().toString()
  );

  const [
    teamOrderDeadline,
    setTeamOrderDeadline,
  ] = useState("");

  const [
    teamOrderStatus,
    setTeamOrderStatus,
  ] = useState<"open" | "closed">("open");

  const [
    teamLoading,
    setTeamLoading,
  ] = useState(false);

  const [
    selectedPlayersTeam,
    setSelectedPlayersTeam,
  ] = useState<TeamProfile | null>(null);

  const [
    teamPlayers,
    setTeamPlayers,
  ] = useState<TeamPlayer[]>([]);

  const [
    playersLoading,
    setPlayersLoading,
  ] = useState(false);

  const [
    playerSaving,
    setPlayerSaving,
  ] = useState(false);

  const [
    editingPlayerId,
    setEditingPlayerId,
  ] = useState<string | null>(null);

  const [
    playerName,
    setPlayerName,
  ] = useState("");

  const [
    playerSizes,
    setPlayerSizes,
  ] = useState<FittedSizes>({
    ...EMPTY_FITTED_SIZES,
  });

  /* ------------------------------------------------------------------------ */
  /* LOAD SAVED LOGOS + DESIGNS                                              */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    try {
      const logos =
        localStorage.getItem(
          "kustom_saved_logos"
        );

      const designs =
        localStorage.getItem(
          "kustom_saved_designs"
        );

      if (logos) {
        setSavedLogos(
          JSON.parse(logos)
        );
      }

      if (designs) {
        setSavedDesigns(
          JSON.parse(designs)
        );
      }
    } catch (error) {
      console.error(
        "Could not load Kustom saved data.",
        error
      );
    }
  }, []);

  /* ------------------------------------------------------------------------ */
  /* LOAD TEAM PROFILES FROM SUPABASE API                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    async function loadTeamProfiles() {
      try {
        setTeamLoading(true);

        const response =
          await fetch(
            "/api/team-profiles",
            {
              method: "GET",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Could not load team profiles."
          );
        }

        const result =
          await response.json();

        const teams =
          Array.isArray(result.teams)
            ? result.teams
            : [];

        const normalized: TeamProfile[] =
          teams.map(
            (team: any) => ({
              id: String(team.id),
              name:
                team.name ?? "",
              organization:
                team.organization ?? null,
              ageGroup:
                team.age_group ?? null,
              season:
                team.season ?? null,
              colors: {
                ...DEFAULT_COLORS,
                ...(team.colors ?? {}),
              },
              primaryLogo:
                team.primary_logo ??
                null,
              secondaryLogo:
                team.secondary_logo ??
                null,
              orderDeadline:
                team.order_deadline ??
                null,
              orderStatus:
                team.order_status ===
                "closed"
                  ? "closed"
                  : "open",
              createdAt:
                team.created_at ??
                new Date().toISOString(),
              updatedAt:
                team.updated_at ??
                new Date().toISOString(),
            })
          );

        setTeamProfiles(
          normalized
        );
      } catch (error) {
        console.error(
          "Could not load team profiles.",
          error
        );
      } finally {
        setTeamLoading(false);
      }
    }

    loadTeamProfiles();
  }, []);

  /* ------------------------------------------------------------------------ */
  /* PERSIST LOGOS                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    try {
      localStorage.setItem(
        "kustom_saved_logos",
        JSON.stringify(savedLogos)
      );
    } catch (error) {
      console.warn(
        "Logo library could not be saved. Browser storage may be full.",
        error
      );
    }
  }, [savedLogos]);

  /* ------------------------------------------------------------------------ */
  /* PERSIST DESIGNS                                                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    try {
      localStorage.setItem(
        "kustom_saved_designs",
        JSON.stringify(savedDesigns)
      );
    } catch (error) {
      console.warn(
        "Design library could not be saved. Browser storage may be full.",
        error
      );
    }
  }, [savedDesigns]);

  /* ------------------------------------------------------------------------ */
  /* HELPERS                                                                  */
  /* ------------------------------------------------------------------------ */

  function changed() {
    setSaved(false);
  }

  function assignedColor(
    region: string
  ) {
    return colors[
      regionAssignments[
        region
      ] ?? "primary"
    ];
  }

  function readImage(
    file: File,
    callback: (
      image: string
    ) => void
  ) {
    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        callback(
          reader.result
        );
      }
    };

    reader.readAsDataURL(file);
  }

  function uploadLogo(
    type:
      | "primary"
      | "secondary",
    file?: File
  ) {
    if (!file) return;

    readImage(
      file,
      (image) => {
        if (
          type === "primary"
        ) {
          setPrimaryLogo(
            image
          );
        } else {
          setSecondaryLogo(
            image
          );
        }

        changed();
      }
    );
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE LOGO                                                                */
  /* ------------------------------------------------------------------------ */

  function openSaveLogo(
    file?: File
  ) {
    if (!file) return;

    readImage(
      file,
      (image) => {
        setLogoToSave(
          image
        );

        setLogoName(
          file.name
            .replace(
              /\.[^/.]+$/,
              ""
            )
            .replace(
              /[-_]/g,
              " "
            )
        );

        setLogoOrganization(
          organizationName
        );

        setSaveLogoOpen(
          true
        );
      }
    );
  }

  function saveLogo() {
    if (
      !logoToSave ||
      !logoName.trim()
    ) {
      return;
    }

    const logo: Logo = {
      id:
        crypto.randomUUID(),

      name:
        logoName.trim(),

      organization:
        logoOrganization.trim(),

      image:
        logoToSave,

      createdAt:
        new Date().toISOString(),
    };

    setSavedLogos(
      (current) => [
        logo,
        ...current,
      ]
    );

    setSaveLogoOpen(
      false
    );

    setLogoToSave(null);
    setLogoName("");

    setSection("logos");
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE DESIGN                                                              */
  /* ------------------------------------------------------------------------ */

  function openSaveDesign() {
    const existing =
      editingDesignId
        ? savedDesigns.find(
            (design) =>
              design.id ===
              editingDesignId
          )
        : null;

    setDesignName(
      existing?.name ??
        `${organizationName} Design`
    );

    setDesignOrganization(
      existing?.organization ??
        organizationName
    );

    setDesignDescription(
      existing?.description ??
        ""
    );

    setSaveDesignOpen(
      true
    );
  }

  function saveDesign() {
    if (
      !designName.trim()
    ) {
      return;
    }

    const now =
      new Date().toISOString();

    const existing =
      editingDesignId
        ? savedDesigns.find(
            (design) =>
              design.id ===
              editingDesignId
          )
        : null;

    const design: SavedDesign = {
      id:
        existing?.id ??
        crypto.randomUUID(),

      name:
        designName.trim(),

      organization:
        designOrganization.trim(),

      description:
        designDescription.trim(),

      colors: {
        ...colors,
      },

      regionAssignments: {
        ...regionAssignments,
      },

      primaryLogo,

      secondaryLogo,

      mainLogo: {
        ...mainLogo,
      },

      upperStrapLogo: {
        ...upperStrapLogo,
      },

      lowerStrapLogo: {
        ...lowerStrapLogo,
      },

      createdAt:
        existing?.createdAt ??
        now,

      updatedAt:
        now,

      published:
        existing?.published ??
        false,
    };

    setSavedDesigns(
      (current) =>
        current.some(
          (item) =>
            item.id ===
            design.id
        )
          ? current.map(
              (item) =>
                item.id ===
                design.id
                  ? design
                  : item
            )
          : [
              design,
              ...current,
            ]
    );

    setEditingDesignId(
      design.id
    );

    setSaved(true);

    setSaveDesignOpen(
      false
    );

    setSection("designs");
  }

  /* ------------------------------------------------------------------------ */
  /* LOAD DESIGN                                                              */
  /* ------------------------------------------------------------------------ */

  function loadDesign(
    design: SavedDesign
  ) {
    setOrganizationName(
      design.organization
    );

    setColors({
      ...design.colors,
    });

    setRegionAssignments({
      ...design.regionAssignments,
    });

    setPrimaryLogo(
      design.primaryLogo
    );

    setSecondaryLogo(
      design.secondaryLogo
    );

    setMainLogo({
      ...design.mainLogo,
    });

    setUpperStrapLogo({
      ...design.upperStrapLogo,
    });

    setLowerStrapLogo({
      ...design.lowerStrapLogo,
    });

    setEditingDesignId(
      design.id
    );

    setSaved(true);

    setSection("studio");
  }

  /* ------------------------------------------------------------------------ */
  /* DESIGN ACTIONS                                                           */
  /* ------------------------------------------------------------------------ */

  function duplicateDesign(
    design: SavedDesign
  ) {
    const now =
      new Date().toISOString();

    setSavedDesigns(
      (current) => [
        {
          ...design,

          id:
            crypto.randomUUID(),

          name:
            `${design.name} Copy`,

          published: false,

          createdAt: now,

          updatedAt: now,
        },

        ...current,
      ]
    );
  }

  function deleteDesign(
    id: string
  ) {
    setSavedDesigns(
      (current) =>
        current.filter(
          (design) =>
            design.id !== id
        )
    );

    if (
      editingDesignId === id
    ) {
      setEditingDesignId(
        null
      );
    }
  }

  function publishDesign(
    id: string
  ) {
    setSavedDesigns(
      (current) =>
        current.map(
          (design) =>
            design.id === id
              ? {
                  ...design,
                  published:
                    true,
                  updatedAt:
                    new Date().toISOString(),
                }
              : design
        )
    );
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE TEAM PROFILE TO SUPABASE                                           */
  /* ------------------------------------------------------------------------ */

  function toDatetimeLocal(value: string | null) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const pad = (number: number) =>
      String(number).padStart(2, "0");

    return `${date.getFullYear()}-${pad(
      date.getMonth() + 1
    )}-${pad(date.getDate())}T${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}`;
  }

  function openNewTeamEditor() {
    setEditingTeamId(null);
    setTeamOrganization(organizationName || "");
    setTeamName(organizationName || "");
    setTeamAgeGroup("");
    setTeamSeason(new Date().getFullYear().toString());
    setTeamOrderDeadline("");
    setTeamOrderStatus("open");
    setTeamEditorOpen(true);
  }

  function openEditTeamEditor(team: TeamProfile) {
    setEditingTeamId(team.id);
    setTeamOrganization(team.organization ?? "");
    setTeamName(team.name);
    setTeamAgeGroup(team.ageGroup ?? "");
    setTeamSeason(
      team.season ??
      new Date().getFullYear().toString()
    );
    setTeamOrderDeadline(
      toDatetimeLocal(team.orderDeadline)
    );
    setTeamOrderStatus(team.orderStatus);
    setTeamEditorOpen(true);
  }

  async function saveTeamProfile() {
    const name = teamName.trim();
    const organization = teamOrganization.trim();

    if (!name) {
      alert("Team name is required.");
      return;
    }

    if (!organization) {
      alert("Organization is required.");
      return;
    }

    try {
      setTeamLoading(true);

      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const response = await fetch(
        "/api/team-profiles",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: editingTeamId ?? undefined,
            name,
            organization,
            age_group:
              teamAgeGroup.trim() || null,
            season:
              teamSeason.trim() || null,
            slug,
            primary_logo:
              primaryLogo ?? null,
            secondary_logo:
              secondaryLogo ?? null,
            colors: { ...colors },
            order_deadline:
              teamOrderDeadline
                ? new Date(
                    teamOrderDeadline
                  ).toISOString()
                : null,
            order_status:
              teamOrderStatus,
            published: true,
            active: true,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Could not save team profile."
        );
      }

      const team = result.team;

      const normalized: TeamProfile = {
        id: String(team.id),
        name: team.name ?? name,
        organization:
          team.organization ?? organization,
        ageGroup:
          (team.age_group ?? teamAgeGroup.trim()) || null,
        season:
          (team.season ?? teamSeason.trim()) || null,
        colors: {
          ...DEFAULT_COLORS,
          ...(team.colors ?? colors),
        },
        primaryLogo:
          team.primary_logo ??
          primaryLogo ??
          null,
        secondaryLogo:
          team.secondary_logo ??
          secondaryLogo ??
          null,
        orderDeadline:
          team.order_deadline ?? null,
        orderStatus:
          team.order_status === "closed"
            ? "closed"
            : "open",
        createdAt:
          team.created_at ??
          new Date().toISOString(),
        updatedAt:
          team.updated_at ??
          new Date().toISOString(),
      };

      setTeamProfiles((current) => {
        const exists = current.some(
          (item) =>
            item.id === normalized.id
        );

        if (exists) {
          return current.map((item) =>
            item.id === normalized.id
              ? normalized
              : item
          );
        }

        return [normalized, ...current];
      });

      setTeamEditorOpen(false);
      setEditingTeamId(null);
      setTeamName("");

      alert(
        editingTeamId
          ? "Team profile updated successfully."
          : "Team profile saved successfully."
      );
    } catch (error) {
      console.error(
        "Could not save team profile.",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Could not save team profile."
      );
    } finally {
      setTeamLoading(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* TEAM PLAYERS + FITTINGS                                                  */
  /* ------------------------------------------------------------------------ */

  function resetPlayerForm() {
    setEditingPlayerId(null);
    setPlayerName("");
    setPlayerSizes({
      ...EMPTY_FITTED_SIZES,
    });
  }

  async function loadTeamPlayers(
    teamId: string
  ) {
    try {
      setPlayersLoading(true);

      const response =
        await fetch(
          `/api/team-players?teamId=${encodeURIComponent(
            teamId
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Could not load players."
        );
      }

      const normalized: TeamPlayer[] =
        Array.isArray(
          result.players
        )
          ? result.players.map(
              (player: any) => ({
                id: String(
                  player.id
                ),
                playerName:
                  player.name ??
                  player.player_name ??
                  "",
                fittedSizes: {
                  ...EMPTY_FITTED_SIZES,
                  ...(player.fitted_sizes ??
                    player.fittedSizes ??
                    {}),
                },
                active: true,
                createdAt: "",
                updatedAt: "",
              })
            )
          : [];

      setTeamPlayers(
        normalized
      );
    } catch (error) {
      console.error(
        "Could not load players.",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Could not load players."
      );
    } finally {
      setPlayersLoading(false);
    }
  }

  function openPlayerManager(
    team: TeamProfile
  ) {
    setSelectedPlayersTeam(
      team
    );
    resetPlayerForm();
    void loadTeamPlayers(
      team.id
    );
  }

  async function saveTeamPlayer() {
    if (
      !selectedPlayersTeam ||
      !playerName.trim()
    ) {
      alert(
        "Player name is required."
      );
      return;
    }

    try {
      setPlayerSaving(true);

      const response =
        await fetch(
          "/api/team-players",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id:
                editingPlayerId ??
                undefined,
              teamId:
                selectedPlayersTeam.id,
              playerName:
                playerName.trim(),
              fittedSizes: {
                ...playerSizes,
              },
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Could not save player."
        );
      }

      const player =
        result.player;

      const normalized: TeamPlayer =
        {
          id: String(
            player.id
          ),
          playerName:
            player.player_name ??
            player.playerName ??
            playerName.trim(),
          fittedSizes: {
            ...EMPTY_FITTED_SIZES,
            ...(player.fitted_sizes ??
              player.fittedSizes ??
              playerSizes),
          },
          active:
            player.active ??
            true,
          createdAt:
            player.created_at ??
            "",
          updatedAt:
            player.updated_at ??
            "",
        };

      setTeamPlayers(
        (current) => {
          const exists =
            current.some(
              (item) =>
                item.id ===
                normalized.id
            );

          if (exists) {
            return current.map(
              (item) =>
                item.id ===
                normalized.id
                  ? normalized
                  : item
            );
          }

          return [
            ...current,
            normalized,
          ].sort((a, b) =>
            a.playerName.localeCompare(
              b.playerName
            )
          );
        }
      );

      resetPlayerForm();
    } catch (error) {
      console.error(
        "Could not save player.",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Could not save player."
      );
    } finally {
      setPlayerSaving(false);
    }
  }

  function editTeamPlayer(
    player: TeamPlayer
  ) {
    setEditingPlayerId(
      player.id
    );
    setPlayerName(
      player.playerName
    );
    setPlayerSizes({
      ...EMPTY_FITTED_SIZES,
      ...player.fittedSizes,
    });

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  async function deleteTeamPlayer(
    id: string
  ) {
    if (
      !selectedPlayersTeam
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Delete this player from the team roster?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setPlayersLoading(true);

      const response =
        await fetch(
          "/api/team-players",
          {
            method: "DELETE",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id,
              teamId:
                selectedPlayersTeam.id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Could not delete player."
        );
      }

      setTeamPlayers(
        (current) =>
          current.filter(
            (player) =>
              player.id !== id
          )
      );

      if (
        editingPlayerId === id
      ) {
        resetPlayerForm();
      }
    } catch (error) {
      console.error(
        "Could not delete player.",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Could not delete player."
      );
    } finally {
      setPlayersLoading(false);
    }
  }

  function closePlayerManager() {
    setSelectedPlayersTeam(
      null
    );
    setTeamPlayers([]);
    resetPlayerForm();
  }

  /* ------------------------------------------------------------------------ */
  /* LOAD TEAM PROFILE                                                        */
  /* ------------------------------------------------------------------------ */

  function loadTeamProfile(
    team: TeamProfile
  ) {
    setOrganizationName(
      team.organization ?? team.name
    );

    setColors({
      ...DEFAULT_COLORS,
      ...team.colors,
    });

    setPrimaryLogo(team.primaryLogo);
    setSecondaryLogo(team.secondaryLogo);
    setSaved(false);
    setSection("studio");
  }

  /* ------------------------------------------------------------------------ */
  /* DELETE TEAM PROFILE FROM SUPABASE                                       */
  /* ------------------------------------------------------------------------ */

  async function deleteTeamProfile(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this team profile?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          "/api/team-profiles",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Could not delete team profile."
        );
      }

      setTeamProfiles(
        (current) =>
          current.filter(
            (team) =>
              team.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Could not delete team profile.",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Could not delete team profile."
      );
    }
  }

  /* ------------------------------------------------------------------------ */
  /* LOGO DRAGGING                                                            */
  /* ------------------------------------------------------------------------ */

  function dragLogo(
    event: PointerEvent<HTMLImageElement>,
    setter: (
      callback: (
        position: LogoPosition
      ) => LogoPosition
    ) => void
  ) {
    const parent =
      event.currentTarget
        .parentElement;

    if (!parent) {
      return;
    }

    const rect =
      parent.getBoundingClientRect();

    const x =
      ((event.clientX -
        rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY -
        rect.top) /
        rect.height) *
      100;

    setter(
      (current) => ({
        ...current,

        x: Math.max(
          0,
          Math.min(100, x)
        ),

        y: Math.max(
          0,
          Math.min(100, y)
        ),
      })
    );

    changed();
  }

  /* ------------------------------------------------------------------------ */
  /* FILTERS                                                                  */
  /* ------------------------------------------------------------------------ */

  const filteredLogos =
    useMemo(() => {
      const search =
        logoSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return savedLogos;
      }

      return savedLogos.filter(
        (logo) =>
          logo.name
            .toLowerCase()
            .includes(search) ||
          logo.organization
            .toLowerCase()
            .includes(search)
      );
    }, [
      savedLogos,
      logoSearch,
    ]);

  const filteredDesigns =
    useMemo(() => {
      const search =
        designSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return savedDesigns;
      }

      return savedDesigns.filter(
        (design) =>
          design.name
            .toLowerCase()
            .includes(search) ||
          design.organization
            .toLowerCase()
            .includes(search) ||
          design.description
            .toLowerCase()
            .includes(search)
      );
    }, [
      savedDesigns,
      designSearch,
    ]);

  const selectedDesign =
    DESIGNS.find(
      (design) =>
        design.id ===
        selectedDesignId
    ) ?? DESIGNS[0];

  const visibleColors: ColorKey[] =
    selectedDesign.colors >= 4
      ? [
          "primary",
          "secondary",
          "accent",
          "neutral",
        ]
      : selectedDesign.colors >= 3
      ? [
          "primary",
          "secondary",
          "accent",
        ]
      : [
          "primary",
          "secondary",
        ];

  const groupedTeams = useMemo(() => {
    const groups = new Map<string, TeamProfile[]>();

    [...teamProfiles]
      .sort((a, b) =>
        `${a.organization ?? ""} ${a.name}`
          .localeCompare(
            `${b.organization ?? ""} ${b.name}`
          )
      )
      .forEach((team) => {
        const organization =
          team.organization?.trim() ||
          "Unassigned Organization";

        const current =
          groups.get(organization) ?? [];

        current.push(team);
        groups.set(organization, current);
      });

    return Array.from(groups.entries());
  }, [teamProfiles]);

  /* ------------------------------------------------------------------------ */
  /* NAVIGATION                                                               */
  /* ------------------------------------------------------------------------ */

  function NavButton({
    id,
    label,
    count,
  }: {
    id:
      | "studio"
      | "teams"
      | "designs"
      | "logos";

    label: string;

    count?: number;
  }) {
    return (
      <button
        type="button"
        onClick={() =>
          setSection(id)
        }
        className={`border-b-2 px-1 pb-3 text-[10px] font-black uppercase tracking-[0.12em] ${
          section === id
            ? "border-[#d6b36a] text-white"
            : "border-transparent text-white/40"
        }`}
      >
        {label}

        {count !== undefined && (
          <span className="ml-2 rounded-full bg-white/10 px-2 py-1 text-[8px]">
            {count}
          </span>
        )}
      </button>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* LOGO IMAGE                                                               */
  /* ------------------------------------------------------------------------ */

  function LogoImage({
    src,
    position,
    setter,
    alt,
  }: {
    src: string;
    position: LogoPosition;
    setter: (
      callback: (
        position: LogoPosition
      ) => LogoPosition
    ) => void;
    alt: string;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="absolute z-[40] cursor-move select-none object-contain"
        style={{
          left:
            `${position.x}%`,

          top:
            `${position.y}%`,

          width:
            `${position.size}%`,

          transform:
            `translate(-50%, -50%) rotate(${position.rotation}deg)`,

          touchAction:
            "none",
        }}
        onPointerDown={(
          event
        ) => {
          event.currentTarget.setPointerCapture(
            event.pointerId
          );
        }}
        onPointerMove={(
          event
        ) => {
          if (
            event.currentTarget.hasPointerCapture(
              event.pointerId
            )
          ) {
            dragLogo(
              event,
              setter
            );
          }
        }}
      />
    );
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#f3f3f1] text-black">

      <header className="bg-black text-white">
        <div className="mx-auto max-w-[1500px] px-6 pt-5">

          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d6b36a]">
            KUSTOM BASEBALL
          </p>

          <h1 className="mt-1 text-2xl font-black uppercase">
            Admin Design Studio
          </h1>

          <nav className="mt-6 flex gap-6 overflow-x-auto">

            <NavButton
              id="studio"
              label="Design Studio"
            />

            <NavButton
              id="teams"
              label="Team Profiles"
              count={
                teamProfiles.length
              }
            />

            <NavButton
              id="designs"
              label="Saved Designs"
              count={
                savedDesigns.length
              }
            />

            <NavButton
              id="logos"
              label="Saved Logos"
              count={
                savedLogos.length
              }
            />

          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-7">

        {/* ================================================================== */}
        {/* DESIGN STUDIO                                                     */}
        {/* ================================================================== */}

        {section === "studio" && (
          <>

            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                Organization
              </p>

              <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>

                  <h2 className="text-3xl font-black uppercase">
                    {organizationName}
                  </h2>

                  <p className="mt-2 text-sm text-black/50">
                    Build the product identity
                    for this team.
                  </p>

                </div>

                <input
                  value={
                    organizationName
                  }
                  onChange={(
                    event
                  ) => {
                    setOrganizationName(
                      event.target.value
                    );

                    changed();
                  }}
                  className="w-full border border-black/15 px-4 py-3 text-sm lg:w-[360px]"
                />

              </div>
            </section>

            {/* COLORS + LOGOS */}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">

              <section className="rounded-2xl border border-black/10 bg-white p-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                  Brand Kit
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase">
                  Team Colors
                </h2>

                <div className="mt-5 grid grid-cols-2 gap-4">

                  {(
                    [
                      "primary",
                      "secondary",
                      "accent",
                      "neutral",
                    ] as ColorKey[]
                  ).map(
                    (key) => (
                      <div
                        key={key}
                        className="rounded-xl border border-black/10 p-3"
                      >

                        <div
                          className="h-14"
                          style={{
                            backgroundColor:
                              colors[key],
                          }}
                        />

                        <div className="mt-3 flex gap-2">

                          <input
                            type="color"
                            value={
                              colors[key]
                            }
                            onChange={(
                              event
                            ) => {
                              setColors(
                                (
                                  current
                                ) => ({
                                  ...current,
                                  [key]:
                                    event
                                      .target
                                      .value,
                                })
                              );

                              changed();
                            }}
                            className="h-8 w-8"
                          />

                          <input
                            value={
                              colors[key]
                            }
                            onChange={(
                              event
                            ) => {
                              setColors(
                                (
                                  current
                                ) => ({
                                  ...current,
                                  [key]:
                                    event
                                      .target
                                      .value,
                                })
                              );

                              changed();
                            }}
                            className="min-w-0 flex-1 border px-2 font-mono text-[10px] uppercase"
                          />

                        </div>
                      </div>
                    )
                  )}

                </div>
              </section>

              {/* LOGOS */}

              <section className="rounded-2xl border border-black/10 bg-white p-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                  Brand Kit
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase">
                  Team Logos
                </h2>

                <div className="mt-5 space-y-4">

                  {/* MAIN LOGO */}

                  <div className="rounded-xl border border-black/10 p-4">

                    <p className="text-xs font-black uppercase">
                      Main Logo
                    </p>

                    <div className="mt-4 flex gap-3">

                      <div className="flex h-20 w-24 items-center justify-center bg-[#f5f5f3]">

                        {primaryLogo ? (
                          <img
                            src={
                              primaryLogo
                            }
                            alt=""
                            className="max-h-16 max-w-[90px] object-contain"
                          />
                        ) : (
                          <span className="text-[8px] font-black uppercase text-black/25">
                            No Logo
                          </span>
                        )}

                      </div>

                      <div className="flex flex-wrap gap-2">

                        <label className="cursor-pointer bg-black px-3 py-2 text-[9px] font-black uppercase text-white">
                          Upload

                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(
                              event
                            ) =>
                              uploadLogo(
                                "primary",
                                event
                                  .target
                                  .files?.[0]
                              )
                            }
                          />
                        </label>

                        <label className="cursor-pointer border px-3 py-2 text-[9px] font-black uppercase">
                          Upload + Save

                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(
                              event
                            ) =>
                              openSaveLogo(
                                event
                                  .target
                                  .files?.[0]
                              )
                            }
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setSection(
                              "logos"
                            )
                          }
                          className="border px-3 py-2 text-[9px] font-black uppercase"
                        >
                          Saved Logos
                        </button>

                      </div>
                    </div>
                  </div>

                  {/* SECONDARY LOGO */}

                  <div className="rounded-xl border border-black/10 p-4">

                    <p className="text-xs font-black uppercase">
                      Secondary Logo
                    </p>

                    <div className="mt-4 flex gap-3">

                      <div className="flex h-20 w-24 items-center justify-center bg-[#f5f5f3]">

                        {secondaryLogo ? (
                          <img
                            src={
                              secondaryLogo
                            }
                            alt=""
                            className="max-h-16 max-w-[90px] object-contain"
                          />
                        ) : (
                          <span className="text-[8px] font-black uppercase text-black/25">
                            No Logo
                          </span>
                        )}

                      </div>

                      <div className="flex flex-wrap gap-2">

                        <label className="cursor-pointer bg-black px-3 py-2 text-[9px] font-black uppercase text-white">
                          Upload

                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(
                              event
                            ) =>
                              uploadLogo(
                                "secondary",
                                event
                                  .target
                                  .files?.[0]
                              )
                            }
                          />
                        </label>

                        <label className="cursor-pointer border px-3 py-2 text-[9px] font-black uppercase">
                          Upload + Save

                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(
                              event
                            ) =>
                              openSaveLogo(
                                event
                                  .target
                                  .files?.[0]
                              )
                            }
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            setSection(
                              "logos"
                            )
                          }
                          className="border px-3 py-2 text-[9px] font-black uppercase"
                        >
                          Saved Logos
                        </button>

                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </div>

            {/* DESIGN */}

            <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                Product Design
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase">
                Choose Design
              </h2>

              <div className="mt-5 grid gap-2 md:grid-cols-3">

                {DESIGNS.map(
                  (design) => (
                    <button
                      key={
                        design.id
                      }
                      type="button"
                      onClick={() => {
                        setSelectedDesignId(
                          design.id
                        );

                        changed();
                      }}
                      className={`border p-5 text-left ${
                        selectedDesignId ===
                        design.id
                          ? "border-black bg-black text-white"
                          : "border-black/10"
                      }`}
                    >
                      <p className="text-xs font-black uppercase">
                        {
                          design.name
                        }
                      </p>

                      <p className="mt-2 text-xs opacity-50">
                        {
                          design.description
                        }
                      </p>
                    </button>
                  )
                )}

              </div>
            </section>

            {/* COLOR PLACEMENT */}

            <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                Color Placement
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">

                {[
                  "Shell",
                  "Straps",
                  "Lining",
                ].map(
                  (region) => (
                    <div
                      key={region}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >

                      <div className="flex items-center gap-3">

                        <span
                          className="h-7 w-7 rounded-full border"
                          style={{
                            backgroundColor:
                              assignedColor(
                                region
                              ),
                          }}
                        />

                        <b className="text-xs uppercase">
                          {region}
                        </b>

                      </div>

                      <select
                        value={
                          regionAssignments[
                            region
                          ]
                        }
                        onChange={(
                          event
                        ) => {
                          setRegionAssignments(
                            (
                              current
                            ) => ({
                              ...current,
                              [region]:
                                event
                                  .target
                                  .value as ColorKey,
                            })
                          );

                          changed();
                        }}
                        className="border px-3 py-2 text-[10px] font-black uppercase"
                      >

                        {visibleColors.map(
                          (key) => (
                            <option
                              key={
                                key
                              }
                              value={
                                key
                              }
                            >
                              {key}
                            </option>
                          )
                        )}

                      </select>

                    </div>
                  )
                )}

              </div>
            </section>

            {/* LOGO CONTROLS */}

            <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">

              <button
                type="button"
                onClick={() =>
                  setLogoControlsOpen(
                    (current) =>
                      !current
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-black/10 bg-[#f8f8f6] px-5 py-4 text-left"
              >

                <div>

                  <p className="text-xs font-black uppercase">
                    Position & Size
                  </p>

                  <p className="mt-1 text-[10px] text-black/40">
                    Move, resize and rotate
                    your logos.
                  </p>

                </div>

                <span className="text-xl">
                  {logoControlsOpen
                    ? "−"
                    : "+"}
                </span>

              </button>

              {logoControlsOpen && (
                <div className="mt-5 grid gap-5 lg:grid-cols-3">

                  <LogoControl
                    title="Main Logo"
                    logo={
                      primaryLogo
                    }
                    position={
                      mainLogo
                    }
                    setPosition={
                      setMainLogo
                    }
                    minSize={3}
                    maxSize={35}
                    reset={() => {
                      setMainLogo({
                        ...DEFAULT_MAIN,
                      });

                      changed();
                    }}
                  />

                  <LogoControl
                    title="Upper Strap Logo"
                    logo={
                      secondaryLogo
                    }
                    position={
                      upperStrapLogo
                    }
                    setPosition={
                      setUpperStrapLogo
                    }
                    minSize={2}
                    maxSize={20}
                    reset={() => {
                      setUpperStrapLogo({
                        ...DEFAULT_UPPER,
                      });

                      changed();
                    }}
                  />

                  <LogoControl
                    title="Lower Strap Logo"
                    logo={
                      secondaryLogo
                    }
                    position={
                      lowerStrapLogo
                    }
                    setPosition={
                      setLowerStrapLogo
                    }
                    minSize={2}
                    maxSize={20}
                    reset={() => {
                      setLowerStrapLogo({
                        ...DEFAULT_LOWER,
                      });

                      changed();
                    }}
                  />

                </div>
              )}
            </section>

            {/* LIVE PREVIEW */}

            <section className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">

              <div className="border-b border-black/10 p-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                  Live Preview
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase">
                  Double Strap Elbow Guard
                </h2>

              </div>

              <div className="bg-[#eeeeec] p-6 sm:p-12">

                <div className="mx-auto flex min-h-[600px] max-w-[1000px] items-center justify-center rounded-2xl border border-black/10 bg-white p-8 shadow-lg">

                  <div className="relative aspect-[16/9] w-full max-w-[900px] overflow-visible">

                    <div
                      className="absolute inset-0"
                      style={{
                        transform:
                          "scale(1.75)",
                        transformOrigin:
                          "center center",
                      }}
                    >

                      <TexturedProductLayer
                        image={
                          PRODUCT.shell
                        }
                        color={assignedColor(
                          "Shell"
                        )}
                        zIndex={10}
                        shell
                      />

                      <TexturedProductLayer
                        image={
                          PRODUCT.lining
                        }
                        color={assignedColor(
                          "Lining"
                        )}
                        zIndex={20}
                      />

                      <TexturedProductLayer
                        image={
                          PRODUCT.straps
                        }
                        color={assignedColor(
                          "Straps"
                        )}
                        zIndex={30}
                      />

                      {primaryLogo && (
                        <LogoImage
                          src={
                            primaryLogo
                          }
                          position={
                            mainLogo
                          }
                          setter={
                            setMainLogo
                          }
                          alt="Main team logo"
                        />
                      )}

                      {secondaryLogo && (
                        <LogoImage
                          src={
                            secondaryLogo
                          }
                          position={
                            upperStrapLogo
                          }
                          setter={
                            setUpperStrapLogo
                          }
                          alt="Upper strap logo"
                        />
                      )}

                      {secondaryLogo && (
                        <LogoImage
                          src={
                            secondaryLogo
                          }
                          position={
                            lowerStrapLogo
                          }
                          setter={
                            setLowerStrapLogo
                          }
                          alt="Lower strap logo"
                        />
                      )}

                    </div>
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between border-t p-6">

                <p className="text-xs text-black/40">
                  {saved
                    ? "✓ Design saved"
                    : "Unsaved changes"}
                </p>

                <button
                  type="button"
                  onClick={
                    openSaveDesign
                  }
                  className="bg-black px-7 py-3 text-[10px] font-black uppercase text-white"
                >
                  {editingDesignId
                    ? "Update Design"
                    : "Save Design"}
                </button>

              </div>
            </section>

          </>
        )}

        {/* ================================================================== */}
        {/* TEAM PROFILES                                                     */}
        {/* ================================================================== */}

        {section === "teams" && (
          <section className="rounded-2xl border border-black/10 bg-white p-6">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                  Brand Library
                </p>

                <h2 className="mt-2 text-3xl font-black uppercase">
                  Team Profiles
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-black/50">
                  Manage teams by organization, including season, age group, order deadline, and order status.
                </p>
              </div>

              <button
                type="button"
                onClick={openNewTeamEditor}
                className="bg-black px-5 py-3 text-[10px] font-black uppercase text-white"
              >
                + Add Team Profile
              </button>

            </div>

            {teamEditorOpen && (
              <div className="mt-6 rounded-2xl border-2 border-black bg-[#f8f8f6] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ad874d]">
                      {editingTeamId ? "Edit Team Profile" : "New Team Profile"}
                    </p>
                    <h3 className="mt-2 text-2xl font-black uppercase">
                      {editingTeamId ? "Update Team" : "Save Team"}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setTeamEditorOpen(false);
                      setEditingTeamId(null);
                    }}
                    className="text-2xl text-black/30 hover:text-black"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Organization
                    </label>
                    <input
                      value={teamOrganization}
                      onChange={(event) =>
                        setTeamOrganization(event.target.value)
                      }
                      placeholder="Kitchener Panthers"
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Team Name
                    </label>
                    <input
                      value={teamName}
                      onChange={(event) =>
                        setTeamName(event.target.value)
                      }
                      placeholder="Senior Panthers"
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Age Group
                    </label>
                    <input
                      value={teamAgeGroup}
                      onChange={(event) =>
                        setTeamAgeGroup(event.target.value)
                      }
                      placeholder="Senior / U18 / U15"
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Season
                    </label>
                    <input
                      value={teamSeason}
                      onChange={(event) =>
                        setTeamSeason(event.target.value)
                      }
                      placeholder="2026"
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Order Deadline
                    </label>
                    <input
                      type="datetime-local"
                      value={teamOrderDeadline}
                      onChange={(event) =>
                        setTeamOrderDeadline(event.target.value)
                      }
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    />
                    <p className="mt-2 text-[9px] text-black/35">
                      The customer-facing team page will use this exact deadline for its live countdown.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Order Status
                    </label>
                    <select
                      value={teamOrderStatus}
                      onChange={(event) =>
                        setTeamOrderStatus(
                          event.target.value as "open" | "closed"
                        )
                      }
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setTeamEditorOpen(false);
                      setEditingTeamId(null);
                    }}
                    className="border bg-white px-5 py-3 text-[10px] font-black uppercase"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={teamLoading}
                    onClick={saveTeamProfile}
                    className="bg-black px-5 py-3 text-[10px] font-black uppercase text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {teamLoading
                      ? "Saving..."
                      : editingTeamId
                      ? "Update Team"
                      : "Save Team"}
                  </button>
                </div>
              </div>
            )}

            {selectedPlayersTeam && (
              <section className="mt-6 rounded-2xl border-2 border-black bg-white p-6">
                <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ad874d]">
                      Players & Fittings
                    </p>
                    <h3 className="mt-2 text-2xl font-black uppercase">
                      {selectedPlayersTeam.name}
                    </h3>
                    <p className="mt-2 text-sm text-black/45">
                      Enter each player once. Their fitted sizes will be preselected on the team ordering page.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closePlayerManager}
                    className="border px-4 py-3 text-[9px] font-black uppercase"
                  >
                    Close Players
                  </button>
                </div>

                <div className="mt-6 rounded-xl border border-black/10 bg-[#f8f8f6] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/40">
                        {editingPlayerId ? "Edit Player" : "Add Player"}
                      </p>
                      <p className="mt-1 text-xs text-black/45">
                        All fitting fields are optional. Enter only the sizes you recorded.
                      </p>
                    </div>

                    {editingPlayerId && (
                      <button
                        type="button"
                        onClick={resetPlayerForm}
                        className="text-[8px] font-black uppercase tracking-[0.12em] text-black/45 underline underline-offset-4"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="mt-5">
                    <label className="block text-[9px] font-black uppercase tracking-[0.12em] text-black/45">
                      Player Name
                    </label>

                    <input
                      value={playerName}
                      onChange={(event) =>
                        setPlayerName(
                          event.target.value
                        )
                      }
                      placeholder="Player name"
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm"
                    />
                  </div>

                  <div className="mt-5">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {PLAYER_FIELDS.map((field) => (
                        <FittingOptionPicker
                          key={field.key}
                          field={field}
                          value={playerSizes[field.key]}
                          onChange={(value) =>
                            setPlayerSizes((current) => ({
                              ...current,
                              [field.key]: value,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={resetPlayerForm}
                      className="border bg-white px-5 py-3 text-[10px] font-black uppercase"
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      onClick={saveTeamPlayer}
                      disabled={
                        playerSaving
                      }
                      className="bg-black px-5 py-3 text-[10px] font-black uppercase text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {playerSaving
                        ? "Saving..."
                        : editingPlayerId
                        ? "Update Player"
                        : "+ Add Player"}
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-black/35">
                        Roster
                      </p>
                      <p className="mt-1 text-sm font-black uppercase">
                        {teamPlayers.length}{" "}
                        {teamPlayers.length === 1
                          ? "Player"
                          : "Players"}
                      </p>
                    </div>
                  </div>

                  {playersLoading ? (
                    <div className="mt-4 border border-dashed p-10 text-center text-sm text-black/40">
                      Loading players...
                    </div>
                  ) : teamPlayers.length === 0 ? (
                    <div className="mt-4 border border-dashed p-10 text-center text-sm text-black/40">
                      No players added yet.
                    </div>
                  ) : (
                    <div className="mt-4 overflow-x-auto border border-black/10">
                      <div className="min-w-[1100px]">
                        <div className="grid grid-cols-9 bg-black text-white">
                          <div className="px-3 py-3 text-[8px] font-black uppercase tracking-[0.08em]">
                            Player
                          </div>

                          {PLAYER_FIELDS.map(
                            (field) => (
                              <div
                                key={
                                  field.key
                                }
                                className="px-3 py-3 text-[8px] font-black uppercase tracking-[0.08em]"
                              >
                                {field.label}
                              </div>
                            )
                          )}

                          <div className="px-3 py-3 text-[8px] font-black uppercase tracking-[0.08em]">
                            Actions
                          </div>
                        </div>

                        {teamPlayers.map(
                          (player) => (
                            <div
                              key={
                                player.id
                              }
                              className="grid grid-cols-9 border-t border-black/10"
                            >
                              <div className="px-3 py-4 text-xs font-black uppercase">
                                {
                                  player.playerName
                                }
                              </div>

                              {PLAYER_FIELDS.map(
                                (field) => (
                                  <div
                                    key={
                                      field.key
                                    }
                                    className="px-3 py-4 text-xs font-black uppercase text-black/60"
                                  >
                                    {player
                                      .fittedSizes[
                                      field.key
                                    ] || "—"}
                                  </div>
                                )
                              )}

                              <div className="flex items-center gap-2 px-3 py-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    editTeamPlayer(
                                      player
                                    )
                                  }
                                  className="border px-3 py-2 text-[8px] font-black uppercase"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteTeamPlayer(
                                      player.id
                                    )
                                  }
                                  className="border border-red-200 px-3 py-2 text-[8px] font-black uppercase text-red-500"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {teamLoading && teamProfiles.length === 0 ? (
              <div className="mt-6 border border-dashed p-12 text-center text-sm text-black/40">
                Loading team profiles...
              </div>
            ) : teamProfiles.length === 0 ? (
              <div className="mt-6 border border-dashed p-12 text-center text-sm text-black/40">
                No team profiles saved yet.
              </div>
            ) : (
              <div className="mt-8 space-y-8">
                {groupedTeams.map(([organization, teams]) => (
                  <div key={organization}>
                    <div className="flex items-end justify-between border-b border-black/10 pb-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ad874d]">
                          Organization
                        </p>
                        <h3 className="mt-1 text-2xl font-black uppercase">
                          {organization}
                        </h3>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.12em] text-black/35">
                        {teams.length} {teams.length === 1 ? "Team" : "Teams"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {teams.map((team) => (
                        <div
                          key={team.id}
                          className="overflow-hidden rounded-2xl border border-black/10 bg-white"
                        >
                          <div className="grid grid-cols-2 bg-[#f5f5f3] p-5">
                            <div className="flex h-28 items-center justify-center p-3">
                              {team.primaryLogo ? (
                                <img
                                  src={team.primaryLogo}
                                  alt=""
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <span className="text-[8px] font-black uppercase text-black/20">
                                  Main
                                </span>
                              )}
                            </div>

                            <div className="flex h-28 items-center justify-center p-3">
                              {team.secondaryLogo ? (
                                <img
                                  src={team.secondaryLogo}
                                  alt=""
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <span className="text-[8px] font-black uppercase text-black/20">
                                  Secondary
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-5">
                            <h4 className="text-lg font-black uppercase">
                              {team.name}
                            </h4>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {team.ageGroup && (
                                <span className="bg-black px-2 py-1 text-[8px] font-black uppercase text-white">
                                  {team.ageGroup}
                                </span>
                              )}
                              {team.season && (
                                <span className="border border-black/10 px-2 py-1 text-[8px] font-black uppercase text-black/50">
                                  {team.season}
                                </span>
                              )}
                              <span className={`${
                                team.orderStatus === "open"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-600"
                              } px-2 py-1 text-[8px] font-black uppercase`}>
                                {team.orderStatus}
                              </span>
                            </div>

                            <div className="mt-4 flex gap-2">
                              {Object.values(team.colors).map((color, index) => (
                                <span
                                  key={index}
                                  className="h-6 w-6 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>

                            <div className="mt-5 border-t border-black/10 pt-4">
                              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-black/35">
                                Order Deadline
                              </p>
                              <p className="mt-1 text-xs font-black uppercase">
                                {team.orderDeadline
                                  ? new Date(team.orderDeadline).toLocaleString([], {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    })
                                  : "No deadline set"}
                              </p>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  openPlayerManager(
                                    team
                                  )
                                }
                                className="bg-black px-2 py-3 text-[8px] font-black uppercase text-white"
                              >
                                Players
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openEditTeamEditor(
                                    team
                                  )
                                }
                                className="border px-2 py-3 text-[8px] font-black uppercase"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  loadTeamProfile(
                                    team
                                  )
                                }
                                className="border bg-[#f5f5f3] px-2 py-3 text-[8px] font-black uppercase"
                              >
                                Load
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  deleteTeamProfile(
                                    team.id
                                  )
                                }
                                className="border border-red-200 px-2 py-3 text-[8px] font-black uppercase text-red-500"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </section>
        )}

        {/* ================================================================== */}
        {/* SAVED DESIGNS                                                     */}
        {/* ================================================================== */}

        {section === "designs" && (
          <section className="rounded-2xl border border-black/10 bg-white p-6">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                  Library
                </p>

                <h2 className="mt-2 text-3xl font-black uppercase">
                  Saved Designs
                </h2>

              </div>

              <input
                value={
                  designSearch
                }
                onChange={(event) =>
                  setDesignSearch(
                    event.target.value
                  )
                }
                placeholder="Search designs or teams"
                className="border px-4 py-3 text-sm sm:w-[300px]"
              />

            </div>

            {filteredDesigns.length ===
            0 ? (
              <div className="mt-6 border border-dashed p-12 text-center text-sm text-black/40">
                No saved designs found.
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {filteredDesigns.map(
                  (design) => (
                    <div
                      key={
                        design.id
                      }
                      className="rounded-2xl border p-5"
                    >

                      <div className="mb-5 flex h-44 items-center justify-center bg-[#f5f5f3]">

                        <div className="relative h-full w-full">

                          <div
                            className="absolute inset-0"
                            style={{
                              transform:
                                "scale(.65)",
                              transformOrigin:
                                "center",
                            }}
                          >

                            <TexturedProductLayer
                              image={
                                PRODUCT.shell
                              }
                              color={
                                design.colors[
                                  design
                                    .regionAssignments
                                    .Shell
                                ] ??
                                design
                                  .colors
                                  .primary
                              }
                              zIndex={10}
                              shell
                            />

                            <TexturedProductLayer
                              image={
                                PRODUCT.lining
                              }
                              color={
                                design.colors[
                                  design
                                    .regionAssignments
                                    .Lining
                                ] ??
                                design
                                  .colors
                                  .secondary
                              }
                              zIndex={20}
                            />

                            <TexturedProductLayer
                              image={
                                PRODUCT.straps
                              }
                              color={
                                design.colors[
                                  design
                                    .regionAssignments
                                    .Straps
                                ] ??
                                design
                                  .colors
                                  .secondary
                              }
                              zIndex={30}
                            />

                            {design.primaryLogo && (
                              <img
                                src={
                                  design.primaryLogo
                                }
                                alt=""
                                className="absolute z-40 object-contain"
                                style={{
                                  left:
                                    `${design.mainLogo.x}%`,
                                  top:
                                    `${design.mainLogo.y}%`,
                                  width:
                                    `${design.mainLogo.size}%`,
                                  transform:
                                    `translate(-50%, -50%) rotate(${design.mainLogo.rotation}deg)`,
                                }}
                              />
                            )}

                          </div>
                        </div>
                      </div>

                      <h3 className="text-sm font-black uppercase">
                        {
                          design.name
                        }
                      </h3>

                      <p className="mt-1 text-[9px] font-black uppercase text-black/40">
                        {
                          design.organization
                        }
                      </p>

                      <p className="mt-3 text-xs text-black/50">
                        {design.description ||
                          "No description"}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            loadDesign(
                              design
                            )
                          }
                          className="bg-black px-2 py-3 text-[8px] font-black uppercase text-white"
                        >
                          Load
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            duplicateDesign(
                              design
                            )
                          }
                          className="border px-2 py-3 text-[8px] font-black uppercase"
                        >
                          Duplicate
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            publishDesign(
                              design.id
                            )
                          }
                          className="border px-2 py-3 text-[8px] font-black uppercase"
                        >
                          {design.published
                            ? "Published"
                            : "Publish"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteDesign(
                              design.id
                            )
                          }
                          className="border border-red-200 px-2 py-3 text-[8px] font-black uppercase text-red-500"
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </section>
        )}

        {/* ================================================================== */}
        {/* SAVED LOGOS                                                       */}
        {/* ================================================================== */}

        {section === "logos" && (
          <section className="rounded-2xl border border-black/10 bg-white p-6">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ad874d]">
                  Brand Library
                </p>

                <h2 className="mt-2 text-3xl font-black uppercase">
                  Saved Logos
                </h2>

                <p className="mt-2 text-sm text-black/50">
                  Upload once and reuse logos
                  across teams and designs.
                </p>

              </div>

              <input
                value={
                  logoSearch
                }
                onChange={(event) =>
                  setLogoSearch(
                    event.target.value
                  )
                }
                placeholder="Search logos or teams"
                className="border px-4 py-3 text-sm sm:w-[300px]"
              />

            </div>

            {filteredLogos.length ===
            0 ? (
              <div className="mt-6 border border-dashed p-12 text-center text-sm text-black/40">
                No saved logos found.
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                {filteredLogos.map(
                  (logo) => (
                    <div
                      key={
                        logo.id
                      }
                      className="overflow-hidden rounded-2xl border"
                    >

                      <div className="flex h-44 items-center justify-center bg-[#f5f5f3] p-7">

                        <img
                          src={
                            logo.image
                          }
                          alt={
                            logo.name
                          }
                          className="max-h-full max-w-full object-contain"
                        />

                      </div>

                      <div className="p-4">

                        <h3 className="truncate text-sm font-black uppercase">
                          {
                            logo.name
                          }
                        </h3>

                        <p className="mt-1 text-[9px] font-black uppercase text-black/40">
                          {
                            logo.organization
                          }
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-2">

                          <button
                            type="button"
                            onClick={() => {
                              setPrimaryLogo(
                                logo.image
                              );

                              changed();

                              setSection(
                                "studio"
                              );
                            }}
                            className="bg-black px-2 py-3 text-[8px] font-black uppercase text-white"
                          >
                            Main Logo
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSecondaryLogo(
                                logo.image
                              );

                              changed();

                              setSection(
                                "studio"
                              );
                            }}
                            className="border bg-[#f5f5f3] px-2 py-3 text-[8px] font-black uppercase"
                          >
                            Strap Logo
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setSavedLogos(
                                (
                                  current
                                ) =>
                                  current.filter(
                                    (
                                      item
                                    ) =>
                                      item.id !==
                                      logo.id
                                  )
                              )
                            }
                            className="col-span-2 border border-red-200 px-2 py-3 text-[8px] font-black uppercase text-red-500"
                          >
                            Delete
                          </button>

                        </div>
                      </div>
                    </div>
                  )
                )}

              </div>
            )}

          </section>
        )}

      </div>

      {/* ==================================================================== */}
      {/* SAVE DESIGN MODAL                                                    */}
      {/* ==================================================================== */}

      {saveDesignOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5">

          <div className="w-full max-w-[520px] rounded-2xl bg-white p-7">

            <h2 className="text-2xl font-black uppercase">
              Save Design
            </h2>

            <input
              value={
                designName
              }
              onChange={(event) =>
                setDesignName(
                  event.target.value
                )
              }
              placeholder="Design name"
              className="mt-6 w-full border px-4 py-3"
            />

            <input
              value={
                designOrganization
              }
              onChange={(event) =>
                setDesignOrganization(
                  event.target.value
                )
              }
              placeholder="Team / Organization"
              className="mt-4 w-full border px-4 py-3"
            />

            <textarea
              value={
                designDescription
              }
              onChange={(event) =>
                setDesignDescription(
                  event.target.value
                )
              }
              placeholder="Description (optional)"
              rows={3}
              className="mt-4 w-full border px-4 py-3"
            />

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setSaveDesignOpen(
                    false
                  )
                }
                className="flex-1 border bg-[#f5f5f3] px-4 py-3 text-[10px] font-black uppercase"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveDesign
                }
                className="flex-1 bg-black px-4 py-3 text-[10px] font-black uppercase text-white"
              >
                Save Design
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SAVE LOGO MODAL                                                      */}
      {/* ==================================================================== */}

      {saveLogoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5">

          <div className="w-full max-w-[520px] rounded-2xl bg-white p-7">

            <h2 className="text-2xl font-black uppercase">
              Save Logo
            </h2>

            {logoToSave && (
              <div className="mt-5 flex h-36 items-center justify-center bg-[#f5f5f3] p-5">

                <img
                  src={
                    logoToSave
                  }
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />

              </div>
            )}

            <input
              value={
                logoName
              }
              onChange={(event) =>
                setLogoName(
                  event.target.value
                )
              }
              placeholder="Logo name"
              className="mt-5 w-full border px-4 py-3"
            />

            <input
              value={
                logoOrganization
              }
              onChange={(event) =>
                setLogoOrganization(
                  event.target.value
                )
              }
              placeholder="Team / Organization"
              className="mt-4 w-full border px-4 py-3"
            />

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setSaveLogoOpen(
                    false
                  )
                }
                className="flex-1 border bg-[#f5f5f3] px-4 py-3 text-[10px] font-black uppercase"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveLogo
                }
                className="flex-1 bg-black px-4 py-3 text-[10px] font-black uppercase text-white"
              >
                Save Logo
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}