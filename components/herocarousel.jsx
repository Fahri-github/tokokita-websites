"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/lib/data";

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = banners.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative overflow-hidden rounded-2xl">
      <div className="flex transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${i * 100}%)` }}>
        {banners.map((b) => (
          <div key={b.title} className={`flex h-44 w-full shrink-0 flex-col justify-center px-8 text-white md:h-72 md:px-16 ${b.bg}`}>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">{b.title}</h2>
            <p className="mt-2 max-w-md text-sm opacity-90 md:text-lg">{b.sub}</p>
            <a href="#" className="mt-4 w-fit rounded-full bg-white px-5 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100">{b.cta}</a>
          </div>
        ))}
      </div>
      <button aria-label="Sebelumnya" onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 shadow hover:bg-white md:block"><ChevronLeft size={20} /></button>
      <button aria-label="Berikutnya" onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 shadow hover:bg-white md:block"><ChevronRight size={20} /></button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {banners.map((_, k) => (
          <button key={k} aria-label={`Banner ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-white" : "w-2 bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
