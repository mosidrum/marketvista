"use client";

import { useDispatch, useSelector } from "react-redux";
import { ProductionDataType, StoreState } from "../../types";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetCart } from "@/app/redux";
import { useCalculatePrices } from "@/app/hooks";
import { Button } from "../button";
import { Session } from "next-auth";

interface CartContainerProps {
  session: Session | null;
}

export const CartContainer = ({ session }: CartContainerProps) => {
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
              <Button onClick={() => dispatch(resetCart())}>Reset cart</Button>
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
            session={session}
          />
        </div>
      ) : (
        <div>No product</div>
      )}
    </div>
  );
};
