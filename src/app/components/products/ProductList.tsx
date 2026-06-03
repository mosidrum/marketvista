import { ProductionDataType } from "@/app/types";
import { getProductData } from "@/lib";
import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductList = async () => {
  const products: ProductionDataType[] = await getProductData();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {products.map((item) => (
        <ProductCard key={item?._id} item={item} />
      ))}
    </div>
  );
};
