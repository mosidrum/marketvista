import Image from "next/image";
import React from "react";
import cart from "../../../../public/download.jpeg";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";

import Link from "next/link";
import { MdAdd } from "react-icons/md";

export const CartItem = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
      <div className="w-full h-20 md:w-4/6 flex justify-between gap-4 p-4 mt-4 rounded-md shadow-custom">
        <div className="flex items-center gap-4">
          <Image src={cart} alt="cart" className="h-10 w-10 md:h-16 md:w-16" />
          <div>
            <p className="text-xs md:text-sm font-bold">Product Title</p>
            <p className="text-xs md:text-sm text-lightOrange">Product brand</p>
          </div>
        </div>
        <div className="w-2/4 md:w-1/2 flex items-center justify-end gap-4 md:justify-between">
          <div className="flex items-center gap-1 md:gap-3 px-2 py-1 border border-lightText rounded-lg">
            <HiPlus className="hover:cursor-pointer" />
            <p>2</p>
            <HiMinus className="hover:cursor-pointer" />
          </div>
          <p className="text-sm md:text-base font-bold text-lightOrange">
            $400
          </p>
          <FaTimes className="hover:cursor-pointer" size={20} />
        </div>
      </div>
      <div className="w-full md:w-2/6 p-8 shadow-custom">
        <p className="text-2xl font-bold text-left mb-8 text-lightOrange">
          Summary
        </p>
        <div className="flex flex-col space-y-12">
          <div className="flex items-center justify-between">
            <p className="text-lightOrange font-bold">Cupon code</p>
            <input
              type="text"
              className="h-8 border border-lightOrange p-2 rounded-xl focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lightOrange font-bold">e-voucher</p>
            <Link href={""} className="flex items-center text-lightGreen">
              <MdAdd size={24} className="font-bold" />
              <span className="font-bold">add</span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lightOrange font-bold">SubTotal</p>
            <p className="font-bold">$900</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lightOrange font-bold">Other processing fee</p>
            <p className="font-bold">$10</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lightOrange font-bold">total</p>
            <p className="font-bold">$1000</p>
          </div>
          <Link
            href={""}
            className="bg-lightOrange p-2 text-center font-bold rounded-md text-bgLight"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
