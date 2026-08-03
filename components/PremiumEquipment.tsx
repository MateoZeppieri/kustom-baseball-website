export default function PremiumEquipment() {
  const products = [
    {
      name: "Batting Gloves",
      description: "Premium Cabretta leather with full team customization.",
    },
    {
      name: "Sliding Mitts",
      description: "Elite protection with fully custom colors and logos.",
    },
    {
      name: "Elbow Guards",
      description: "Lightweight protection built for confidence at the plate.",
    },
    {
      name: "Leg Guards",
      description: "Premium impact protection without sacrificing mobility.",
    },
    {
      name: "Hand Guards",
      description: "Custom protection designed for every swing.",
    },
    {
      name: "Compression Sleeves",
      description: "Graduated compression with fully custom team designs.",
    },
  ];

  return (
    <section className="bg-[#0A0A0A] pt-0 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="group rounded-3xl border border-neutral-800 bg-neutral-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#CBAD7D]"
            >
              <div className="mb-8 flex aspect-square items-center justify-center rounded-2xl bg-neutral-900 text-neutral-600">
                Product Image
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-white">
                {product.name}
              </h3>

              <p className="mb-8 text-gray-400">
                {product.description}
              </p>

              <button className="font-semibold text-[#CBAD7D] transition group-hover:translate-x-1">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}