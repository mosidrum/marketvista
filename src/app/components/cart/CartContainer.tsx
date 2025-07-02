"use client";

import { useDispatch, useSelector } from "react-redux";
import { ProductionDataType, StoreState } from "../../types";
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
      <div className="text-2xl font-bold text-lightOrange my-8">Hello</div>
    </div>
  );
};
