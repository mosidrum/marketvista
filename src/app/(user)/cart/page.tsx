import { Container } from "@/app/components";
import React from "react";
import {CartContainer} from "../../components";

export default function CartPage() {
  return (
    <Container className="py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
      <CartContainer />
    </Container>
  );
}
