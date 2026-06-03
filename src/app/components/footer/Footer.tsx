import React from "react";
import { Container } from "../Container";
import { footerItems } from "@/app/constants";
import Link from "next/link";
import { Logo } from "../Navbar/Logo";

export const Footer = () => {
  return (
    <footer className="bg-bgLight border-t border-lightText/20">
      <Container className="py-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {footerItems.map((item) => (
          <div key={item?.id}>
            <h3 className="text-darkOrange/90 text-base font-semibold mb-4">
              {item?.title}
            </h3>
            <div className="flex flex-col gap-1">
              {item?.listItem.map((list) =>
                list?.listData.map((data) => (
                  <Link
                    key={data}
                    href="/"
                    className="py-1 text-sm text-lightText hover:text-darkOrange hoverEffect"
                  >
                    {data}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </Container>
      <div className="border-t border-lightText/20">
        <Container className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Logo className="text-lg" />
          <p className="text-sm text-lightText text-center sm:text-right">
            &copy; {new Date().getFullYear()} MarketVista. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};
