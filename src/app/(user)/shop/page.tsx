import { Container, ProductList } from "@/app/components";
import React from "react";

export default function ShopPage() {
  return (
    <Container className="py-5">
      <h2 className="text-2xl font-semibold mb-5 ">All Available Products:</h2>
      <ProductList />
    </Container>
  );
}
