"use client";

import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../types";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetCart } from "@/app/redux";
import { useCalculatePrices } from "@/app/hooks";
import { Button } from "@/app";
import { useAuth } from "@/app/hooks";

export const CartContainer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
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
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start">
          <div className="w-full">
            <div className="flex justify-end">
              <Button onClick={() => dispatch(resetCart())}>Reset Cart</Button>
            </div>
            {cart.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
          <CartSummary
            originalTotal={originalTotal}
            moneyToTakeOff={moneyToTakeOff}
            numberOfItems={numberOfItems}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ) : (
        <div className="text-2xl font-bold text-lightOrange my-8">
          NO product in your cart
        </div>
      )}
    </div>
  );
};
