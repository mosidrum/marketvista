import React from "react";
import { Container } from "../Container";
import { footerItems } from "@/app/constants";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-bgLight py-5">
      <Container className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {footerItems.map((item) => (
          <div key={item?.id}>
            <h3 className="text-darkOrange/90 text-lg font-semibold mb-3">
              {item?.title}
            </h3>
            <div className="flex flex-col gap-0.5">
              {item?.listItem.map((list) =>
                list?.listData.map((data) => (
                  <Link
                    key={data}
                    href="/"
                    className="py-1 text-accent font-medium hover:text-darkOrange hoverEffect"
                  >
                    {data}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};
