"use client";

import { Loader, resetCart, StoreState } from "@/app";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  HiCheckCircle,
  HiHand,
  HiHome,
  HiInformationCircle,
  HiMail,
} from "react-icons/hi";
import Link from "next/link";

export const SuccessContainer = ({ id }: { id: string }) => {
  const { cart } = useSelector((state: StoreState) => state?.marketVista);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let price = 0;
    cart.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [cart]);

  const handleSaveOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/saveorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          email: session?.user?.email,
          totalAmount,
          id,
        }),
      });
      const data = await response.json();
      if (data?.success) {
        setLoading(false);
        dispatch(resetCart());
      }
    } catch (error) {
      console.error("Error saving order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user && cart.length) {
      handleSaveOrder();
    }
  }, [session?.user, cart.length, handleSaveOrder]);

  console.log(loading);

  return (
    <div>
      {loading ? (
        <Loader title="Payment is process, do not cancel or press back button" />
      ) : (
        <div className="bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-36">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 bg-green-100 rounded-full"></div>
              </div>
              <div className="relative">
                <HiCheckCircle className="mx-auto h-24 w-24 text-green-500" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold">Success!</h2>
            <p className="text-sm mt-2 text-gray-600">
              Your payment has been completed successfully!
            </p>
            <div className="mt-8 space-y-6">
              <p className="text-base text-gray-700">
                Thank you for your submission. We have recieved your information
                and will process it shortly. You should receive a confirmation
                email within the next few minutes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href={"/"}>
                  <button className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 hoverEffect text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <HiHome className="mr-2 h-5 w-5" />
                    Home
                  </button>
                </Link>
                <Link href={"/"}>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 hoverEffect text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <HiInformationCircle className="mr-2 h-5 w-5" />
                    Orders
                  </button>
                </Link>
                <Link href={"/"}>
                  <button className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 hoverEffect text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <HiMail className="mr-2 h-5 w-5" />
                    Contact
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-10 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-green-300 rounded-full" />
              <div className="w-3 h-3 bg-green-300 rounded-full" />
              <div className="w-3 h-3 bg-green-300 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
