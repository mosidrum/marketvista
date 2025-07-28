"use client";
import { resetCart } from "@/app/redux";
import { StoreState } from "@/app/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader";

export const SuccessPayment = ({ id }: { id: string }) => {
  const { cart } = useSelector((state: StoreState) => state?.marketVista);
  const dispatch = useDispatch();
  const { data: session } = useSession;
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let totalPrice = 0;
    cart.map((item) => {
      return (totalPrice += item.price * item.quantity);
    });

    if (session?.user && cart.length) {
      handleSaveOrder();
    }
  }, [cart, session?.user, cart.length]);

  const handleSaveOrder = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/saveorder", {
        method: "POST",
        headers: {
          "COntent-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          email: session.user.email as string,
          id: id,
          totalAmount,
        }),
      });
      const data = await response.json();
      if (data?.success) {
        setIsLoading(false);
        dispatch(resetCart());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
          {isLoading ? (
                <Loader title="payment is processing... Please don not close this page" />

          ) : ()}
    </div>
  );
};
