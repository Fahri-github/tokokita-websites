// Data dummy. Ganti dengan fetch ke API back-end (tabel products, stores, categories).
export const rupiah = (n) => "Rp" + new Intl.NumberFormat("id-ID").format(n);

export const banners = [
  { title: "Mega Sale 11.11", sub: "Diskon hingga 70% dan gratis ongkir", cta: "Belanja sekarang", bg: "bg-primary" },
  { title: "Elektronik pilihan", sub: "Cicilan 0% hingga 12 bulan", cta: "Lihat promo", bg: "bg-indigo-600" },
  { title: "Fashion terbaru", sub: "Koleksi musim ini mulai Rp49.000", cta: "Jelajahi koleksi", bg: "bg-rose-600" },
  { title: "Rumah lebih nyaman", sub: "Perabot dan dekorasi serba hemat", cta: "Cek sekarang", bg: "bg-emerald-600" },
  { title: "Voucher pengguna baru", sub: "Cashback hingga Rp100.000", cta: "Klaim voucher", bg: "bg-slate-800" },
];

export const categories = [
  ["📱", "Handphone"], ["💻", "Laptop"], ["🎧", "Audio"], ["📷", "Kamera"],
  ["👕", "Pakaian Pria"], ["👗", "Pakaian Wanita"], ["👟", "Sepatu"], ["👜", "Tas"],
  ["🏠", "Rumah Tangga"], ["🍳", "Dapur"], ["💄", "Kecantikan"], ["🧸", "Ibu & Bayi"],
  ["⚽", "Olahraga"], ["🚗", "Otomotif"], ["🍜", "Makanan"], ["🎮", "Hobi & Game"],
];

const names = [
  "Smartphone 5G 128GB", "Earbuds Wireless Bluetooth", "Kaos Oversize Cotton Combed",
  "Sepatu Sneakers Pria Casual", "Tas Ransel Anti Air Laptop", "Rice Cooker Digital 1.8L",
  "Smartwatch Layar AMOLED", "Serum Wajah Niacinamide 10%", "Lampu Meja LED Dimmer",
  "Power Bank 20.000mAh Fast Charging", "Jaket Hoodie Fleece Unisex", "Blender Portable USB",
];
const cities = ["Jakarta Barat", "Surabaya", "Bandung", "Medan", "Semarang", "Tangerang", "Yogyakarta", "Makassar"];

// Deterministik (tanpa Math.random) agar hasil SSR dan client sama.
export function makeProducts(start, count, flash = false) {
  return Array.from({ length: count }, (_, k) => {
    const i = start + k;
    const base = (((i * 7919) % 450) + 50) * 1000;
    const discount = flash ? 30 + (i % 4) * 10 : i % 3 === 0 ? 10 + (i % 5) * 10 : 0;
    const stock = 50 + (i % 7) * 20;
    return {
      id: i + 1,
      name: `${names[i % names.length]} ${["Original", "Premium", "Terbaru"][i % 3]}`,
      price: Math.round((base * (100 - discount)) / 10000) * 100,
      oldPrice: discount ? base : null,
      discount,
      rating: (4 + ((i * 3) % 10) / 10).toFixed(1),
      city: cities[i % cities.length],
      stock,
      sold: Math.min(stock, 10 + ((i * 13) % stock)),
      image: `https://picsum.photos/seed/tokokita${i + 1}/400/400`,
    };
  });
}
