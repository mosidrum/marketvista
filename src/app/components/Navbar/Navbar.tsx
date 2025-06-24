import React from "react";
import { Container } from "../Container";
import { Logo } from "./Logo";
import { SearchInput } from "./SearchInput";
import { NavbarList } from "./NavBarList";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-accentWhite border-b-[1px] border-b-lightText/50 z-50">
      <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
        <Logo />
        <SearchInput />
        <NavbarList />
      </Container>
    </header>
  );
};
