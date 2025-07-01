import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";
import { FormattedPrice } from "@/app";
import { Button } from "@/app";

type CartSummaryProps = Record<
  | "originalTotal"
  | "moneyToTakeOff"
  | "numberOfItems"
  | "deliveryFee"
  | "grandTotal",
  number
> & {
  isAuthenticated: boolean;
};

export const CartSummary = ({
  originalTotal,
  moneyToTakeOff,
  numberOfItems,
  deliveryFee,
  grandTotal,
  isAuthenticated,
}: CartSummaryProps) => {
  return (
    <div className="w-full md:w-2/5 p-8 shadow-custom rounded-md">
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
          <p className="text-lightOrange font-bold">Total items</p>
          <p className="font-bold">{numberOfItems}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lightOrange font-bold">Total</p>
          <FormattedPrice amount={originalTotal} />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lightOrange font-bold">Discount</p>
          <FormattedPrice amount={moneyToTakeOff} />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lightOrange font-bold">Delivery fee</p>
          {deliveryFee > 0 ? (
            <FormattedPrice amount={deliveryFee} />
          ) : (
            <span className="text-3xl">🆓</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lightOrange font-bold">Subtotal</p>
          <FormattedPrice
            amount={grandTotal}
            className="text-lightGreen font-bold"
          />
        </div>
        {isAuthenticated ? (
          <Button onClick={() => {}}>Proceed to checkout</Button>
        ) : (
         <div className='w-full bg-lightOrange p-2 rounded-md text-center text-white'>
           <Link href="/signin">Sign in to checkout</Link>
         </div>
        )}
      </div>
    </div>
  );
};
