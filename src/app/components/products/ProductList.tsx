import { ProductionDataType } from "@/app/types";
import { getProductData } from "@/lib";
import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductList = async () => {
  const products: ProductionDataType[] = await getProductData();

  return (
    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((item) => (
        <ProductCard key={item?._id} item={item} />
      ))}
    </div>
  );
};
