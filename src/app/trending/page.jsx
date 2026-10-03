import ProductGrid from "@/components/product/ProductGrid";
import { luxuryPret } from "../../../data/products";
import { luxuryFormals } from "../../../data/luxuryFormals";
import { culture } from "../../../data/culture";
import { jewelry } from "../../../data/jewelry";
import { accessories } from "../../../data/accessories";
import { trendingSlugs } from "../../../data/trending";

const allProducts = [...luxuryPret, ...luxuryFormals, ...culture, ...jewelry, ...accessories];

export default function TrendingPage() {
  const trendingProducts = trendingSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
          Trending Now
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {trendingProducts.length} products everyone&apos;s loving right now
        </p>
      </div>

      <ProductGrid products={trendingProducts} isTrending={true} />
    </div>
  );
}