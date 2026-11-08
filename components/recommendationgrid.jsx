"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { makeProducts } from "@/lib/data";

const PAGE = 12;
const MAX_ITEMS = 120;

export default function RecommendationGrid({ initial }) {
  const [items, setItems] = useState(initial);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef(null);
  const done = items.length >= MAX_ITEMS;

  useEffect(() => {
    if (done || !sentinel.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || loading) return;
      setLoading(true);
      // TODO: ganti dengan fetch ke API (halaman/cursor berikutnya)
      setTimeout(() => {
        setItems((prev) => [...prev, ...makeProducts(8 + prev.length, PAGE)]);
        setLoading(false);
      }, 600);
    }, { rootMargin: "400px" });
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [done, loading]);

  return (
    <section>
      <h2 className="mb-3 text-lg font-extrabold">Rekomendasi untukmu</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      <div ref={sentinel} className="grid h-16 place-items-center text-sm text-gray-500">
        {loading ? <Loader2 className="animate-spin text-primary" /> : done ? "Kamu sudah melihat semua rekomendasi." : null}
      </div>
    </section>
  );
}
