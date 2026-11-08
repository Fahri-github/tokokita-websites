"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Search, ShoppingCart, Bell, User, Clock } from "lucide-react";
import { selectCartCount } from "@/lib/store";

const popular = ["iPhone 15", "sepatu sneakers", "earbuds bluetooth", "rice cooker", "kaos oversize", "power bank", "smartwatch", "tas ransel laptop"];

export default function Header() {
  const count = useSelector(selectCartCount);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("search_history") || "[]")); } catch {}
  }, []);

  const submit = (term) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...history.filter((h) => h !== t)].slice(0, 5);
    setHistory(next);
    try { localStorage.setItem("search_history", JSON.stringify(next)); } catch {}
    setQ(t);
    setOpen(false);
    // TODO: router.push(`/search?q=${encodeURIComponent(t)}`)
  };

  const list = q ? popular.filter((s) => s.toLowerCase().includes(q.toLowerCase())) : history;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
        <a href="/" className="text-2xl font-extrabold tracking-tight text-primary">
          Toko<span className="text-gray-900">Kita</span>
        </a>

        <form onSubmit={(e) => { e.preventDefault(); submit(q); }} className="relative flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            placeholder="Cari produk, toko, atau kategori"
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-5 pr-12 text-sm outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
          <button aria-label="Cari" className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-primary text-white">
            <Search size={16} />
          </button>
          {open && list.length > 0 && (
            <ul onMouseDown={(e) => e.preventDefault()} className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/10">
              {!q && <li className="px-4 py-1 text-xs font-semibold text-gray-400">Riwayat pencarian</li>}
              {list.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => submit(s)} className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-50">
                    {q ? <Search size={14} /> : <Clock size={14} />}
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>

        <nav className="flex items-center gap-1 md:gap-3">
          <a href="/cart" aria-label="Keranjang" className="relative rounded-full p-2 hover:bg-gray-100">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">{count}</span>
            )}
          </a>
          <button aria-label="Notifikasi" className="hidden rounded-full p-2 hover:bg-gray-100 sm:block"><Bell size={22} /></button>
          <button className="flex items-center gap-2 rounded-full p-2 hover:bg-gray-100">
            <User size={22} />
            <span className="hidden text-sm font-semibold md:inline">Masuk</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
