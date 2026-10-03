import ProductCard from "./ProductCard";

const ProductGrid = ({ products, isTrending = null }) => {
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-20 text-center text-sm text-gray-500">
        No products found in this collection.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-x-3
        gap-y-7

        sm:grid-cols-2
        sm:gap-x-4
        sm:gap-y-8

        md:grid-cols-3
        md:gap-x-5
        md:gap-y-10

        lg:grid-cols-4
        lg:gap-x-6
        lg:gap-y-12
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isTrending={isTrending}
        />
      ))}
    </div>
  );
};

export default ProductGrid;