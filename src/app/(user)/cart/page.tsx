import { CartContainer, Container } from "@/app/components";
import React from "react";
import { auth } from "@/auth";

export default async function CartPage() {
  const session = await auth();

  return (
    <Container className="py-10">
      <CartContainer session={session} />
    </Container>
  );
}
