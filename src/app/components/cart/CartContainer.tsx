"use client";

import { useDispatch, useSelector } from "react-redux";
import { ProductionDataType, StoreState } from "../../types";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetCart } from "@/app/redux";
import { useCalculatePrices } from "@/app/hooks";

export const CartContainer = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: StoreState) => state?.marketVista);
  const {
    originalTotal,
    moneyToTakeOff,
    numberOfItems,
    deliveryFee,
    grandTotal,
  } = useCalculatePrices(cart);

  return (
    <div>
      <Link href={"/shop"} className="flex items-center gap-2">
        <IoIosArrowRoundBack size={24} />
        Back
      </Link>
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="w-full">
            <div className="flex justify-end">
              <button
                className="p-2 shadow-custom font-bold rounded-md bg-darkOrange text-bgLight"
                onClick={() => dispatch(resetCart())}
              >
                Reset cart
              </button>
            </div>{" "}
            {cart.map((item: ProductionDataType, index) => (
              <CartItem item={item} key={index} />
            ))}
          </div>
          <CartSummary
            originalTotal={originalTotal}
            moneyToTakeOff={moneyToTakeOff}
            numberOfItems={numberOfItems}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
          />
        </div>
      ) : (
        <div>No product</div>
      )}
    </div>
  );
};
