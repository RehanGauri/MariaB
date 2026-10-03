import ProductDetail from "@/components/product/ProductDetail";
import { luxuryPret } from "../../../../data/products";
import { luxuryFormals } from "../../../../data/luxuryFormals";
import { culture } from "../../../../data/culture";
import {jewelry} from "../../../../data/jewelry";
import { accessories } from "../../../../data/accessories";

const allProducts = [...luxuryPret, ...luxuryFormals, ...culture, ...jewelry, ...accessories];

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  return <ProductDetail product={product} />;
}