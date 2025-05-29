import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

export const CartSummary = () => {
  return (
    <div className="w-full md:w-2/5 p-8 shadow-custom">
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
          <p className="font-bold">000</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lightOrange font-bold">Other processing fee</p>
          <p className="font-bold">000</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lightOrange font-bold">total</p>
          <p className="font-bold">000</p>
        </div>
        <Link
          href={""}
          className="bg-lightOrange p-2 text-center font-bold rounded-md text-bgLight"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};
