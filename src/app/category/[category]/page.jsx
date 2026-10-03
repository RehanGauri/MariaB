import ProductGrid from "@/components/product/ProductGrid";
import { luxuryPret } from "../../../../data/products";
import { luxuryFormals } from "../../../../data/luxuryFormals";
import { culture } from "../../../../data/culture";
import { jewelry } from "../../../../data/jewelry";
import { accessories } from "../../../../data/accessories";

const allProducts = [...luxuryPret, ...luxuryFormals, ...culture, ...jewelry, ...accessories];

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const products = allProducts.filter((p) => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wide capitalize">
          {category.replace("-", " ")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{products.length} products</p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}