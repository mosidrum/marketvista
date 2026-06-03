import { Container, ProductList } from "@/app/components";
import React from "react";

export default function ShopPage() {
  return (
    <Container className="py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">All Products</h1>
      <ProductList />
    </Container>
  );
}
