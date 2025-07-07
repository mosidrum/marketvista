"use client";

import { useDispatch, useSelector } from "react-redux";
import {AlertType, StoreState} from "@/app";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { resetCart } from "@/app/redux";
import { useCalculatePrices } from "@/app/hooks";
import { Button } from "@/app";
import { useAuth } from "@/app/hooks";
import {showAlert} from "@/app/utils";

export const CartContainer = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  const { cart } = useSelector((state: StoreState) => state?.marketVista);
  const {
    originalTotal,
    moneyToTakeOff,
    numberOfItems,
    deliveryFee,
    grandTotal,
  } = useCalculatePrices(cart);

  const handleCheckOut = async () => {
    showAlert(`User signed in successfully`, AlertType.SUCCESS);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        email: user?.email,
      }),
    });
    const {url} = await response.json();
    if (url) window.location.href = url;
  };

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
            handleCheckOut={handleCheckOut}
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
