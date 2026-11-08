"use client";
import { Star, MapPin, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "@/lib/store";
import { rupiah } from "@/lib/data";

export default function ProductCard({ p, showStock = false }) {
  const dispatch = useDispatch();
  const pct = Math.round((p.sold / p.stock) * 100);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
        {p.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">-{p.discount}%</span>
        )}
        <button
          onClick={() => dispatch(addItem(p))}
          aria-label="Masukkan keranjang"
          className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-primary text-white shadow-lg active:scale-90 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm leading-5">{p.name}</h3>
        <div className="min-h-9">
          <p className="text-base font-bold text-primary-dark">{rupiah(p.price)}</p>
          {p.oldPrice && <p className="text-xs text-gray-400 line-through">{rupiah(p.oldPrice)}</p>}
        </div>

        {showStock ? (
          <div className="mt-auto pt-1">
            <div className="h-2 overflow-hidden rounded-full bg-orange-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-500">Terjual {p.sold}</p>
          </div>
        ) : (
          <div className="mt-auto space-y-0.5 pt-1 text-xs text-gray-500">
            <p className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{p.rating}</p>
            <p className="flex items-center gap-1"><MapPin size={12} />{p.city}</p>
          </div>
        )}
      </div>
    </article>
  );
}
