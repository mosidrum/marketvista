import React from "react";
import { Container } from "../Container";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className="w-full h-20 bg-accentWhite border-b-[1px] border-b-lightText/50">
      <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
        <Logo />
        <div>searchInput</div>
        <div>navBarList</div>
      </Container>
    </header>
  );
};
