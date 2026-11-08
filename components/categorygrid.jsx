import { categories } from "@/lib/data";

// Mobile: 2 baris, geser horizontal. Desktop: grid 8 kolom x 2 baris.
export default function CategoryGrid() {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-3 text-lg font-extrabold">Kategori</h2>
      <div className="no-scrollbar grid auto-cols-[84px] grid-flow-col grid-rows-2 gap-3 overflow-x-auto md:auto-cols-auto md:grid-flow-row md:grid-cols-8 md:grid-rows-none md:overflow-visible">
        {categories.map(([icon, name]) => (
          <a key={name} href="#" className="group flex flex-col items-center gap-1.5 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-2xl group-hover:bg-primary/20">{icon}</span>
            <span className="text-xs leading-4 text-gray-700">{name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
