import { Container, ProductList } from "@/app/components";
import React from "react";

export default function ShopPage() {
  return (
    <Container>
      <h2>All Available Products:</h2>
      <ProductList />
    </Container>
  );
}
