import React from "react";
import { FaClockRotateLeft, FaWallet } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";
import { PiChats } from "react-icons/pi";

const data = [
  {
    title: "Free delivery",
    description: "If ordering price is above $500",
    icon: <GoRocket />,
  },
  {
    title: "90 Days Return",
    description: "If goods have issues",
    icon: <FaClockRotateLeft />,
  },
  {
    title: "Secure payment",
    description: "100% secured payment",
    icon: <FaWallet />,
  },
  {
    title: "24h Support",
    description: "Dedicated support",
    icon: <PiChats />,
  },
];

export const Facilities = () => {
  return (
    <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-center gap-3 bg-bgLight rounded-lg p-4"
        >
          <span className="text-3xl text-lightOrange shrink-0">{item.icon}</span>
          <div className="text-center sm:text-left">
            <h2 className="text-sm font-bold uppercase">{item.title}</h2>
            <p className="text-xs text-lightText mt-0.5">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
