import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import FlashSale from "@/components/FlashSale";
import RecommendationGrid from "@/components/RecommendationGrid";
import Footer from "@/components/Footer";
import { makeProducts } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5">
        <HeroCarousel />
        <CategoryGrid />
        <FlashSale products={makeProducts(0, 8, true)} />
        <RecommendationGrid initial={makeProducts(8, 12)} />
      </main>
      <Footer />
    </>
  );
}
