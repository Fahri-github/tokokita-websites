"use client";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import ProductCard from "./ProductCard";

const pad = (n) => String(n).padStart(2, "0");

export default function FlashSale({ products }) {
  const [left, setLeft] = useState(null); // null saat SSR agar tidak hydration mismatch

  useEffect(() => {
    const end = Date.now() + 3 * 3600 * 1000; // demo 3 jam. Ganti dengan waktu berakhir dari API.
    const tick = () => setLeft(Math.max(0, Math.floor((end - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = left === null ? ["--", "--", "--"] : [Math.floor(left / 3600), Math.floor((left % 3600) / 60), left % 60].map(pad);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="flex items-center gap-1 text-lg font-extrabold text-primary"><Zap size={20} className="fill-current" />Flash Sale</h2>
          <div className="flex items-center gap-1 text-sm font-bold text-white">
            {parts.map((x, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="grid h-7 min-w-8 place-items-center rounded-md bg-gray-900 px-1 tabular-nums">{x}</span>
                {i < 2 && <span className="text-gray-900">:</span>}
              </span>
            ))}
          </div>
        </div>
        <a href="#" className="text-sm font-semibold text-primary hover:underline">Lihat semua</a>
      </div>
      <div className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
        {products.map((p) => (
          <div key={p.id} className="w-40 shrink-0 snap-start md:w-48"><ProductCard p={p} showStock /></div>
        ))}
      </div>
    </section>
  );
}
