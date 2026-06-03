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
import { showAlert } from "@/app/utils";

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
        try {
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
            if (!response.ok) {
                showAlert("Checkout failed. Please try again.", AlertType.ERROR);
                return;
            }
            const { url } = await response.json();
            if (url) window.location.href = url;
        } catch {
            showAlert("Checkout failed. Please check your connection.", AlertType.ERROR);
        }
    };

    return (
        <div>
            <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-lightText hover:text-darkOrange hoverEffect mb-4">
                <IoIosArrowRoundBack size={20} />
                Continue shopping
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
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                    <p className="text-6xl">🛒</p>
                    <h2 className="text-2xl font-bold text-lightOrange">Your cart is empty</h2>
                    <p className="text-lightText text-sm">Looks like you haven&apos;t added anything yet.</p>
                    <Link href="/shop" className="mt-2 bg-darkOrange text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-lightOrange hoverEffect">
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
};
