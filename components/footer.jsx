const links = {
  Bantuan: ["Pusat Bantuan", "Cara Belanja", "Pengembalian Barang", "Hubungi Kami"],
  TokoKita: ["Tentang Kami", "Karier", "Kebijakan Privasi", "Syarat & Ketentuan"],
  Jual: ["Buka Toko", "Seller Center", "Panduan Penjual"],
};
const payments = ["BCA", "Mandiri", "BNI", "GoPay", "OVO", "DANA", "Visa", "Mastercard"];
const couriers = ["JNE", "SiCepat", "J&T", "GoSend", "AnterAja"];

const Chips = ({ title, items }) => (
  <div>
    <h3 className="mb-2 text-sm font-bold">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((x) => <span key={x} className="rounded-md border border-gray-200 px-2 py-1 text-xs font-semibold text-gray-600">{x}</span>)}
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h3 className="mb-2 text-sm font-bold">{title}</h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {items.map((x) => <li key={x}><a href="#" className="hover:text-primary">{x}</a></li>)}
            </ul>
          </div>
        ))}
        <Chips title="Metode pembayaran" items={payments} />
        <Chips title="Jasa pengiriman" items={couriers} />
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-500">
        Ikuti kami di Instagram, TikTok, dan YouTube. © 2026 TokoKita. Transaksi aman dan terlindungi.
      </div>
    </footer>
  );
}
