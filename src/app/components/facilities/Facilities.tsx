import React from "react";
import { FaClockRotateLeft, FaWallet } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";
import { PiChats } from "react-icons/pi";

const data = [
  {
    title: "Free delivery",
    description: "If Ordering price is above $500",
    icon: <GoRocket />,
  },
  {
    title: "90 Days Return",
    description: "If goods have issues",
    icon: <FaClockRotateLeft />,
  },
  {
    title: "Secure payment",
    description: "100% secured paymenr]t",
    icon: <FaWallet />,
  },
  {
    title: "24hours Support",
    description: "Dedicated support",
    icon: <PiChats />,
  },
];

export const Facilities = () => {
  return (
    <div className="py-10 grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <span className="text-3xl text-lightOrange">{item.icon}</span>
          <div className="text-center sm:text-left">
            <h2 className="uppercase font-bold">{item.title}</h2>
            <p className="text-sm text-lightText">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
