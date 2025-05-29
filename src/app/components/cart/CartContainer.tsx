"use client";

import { useSelector } from "react-redux";
import { ProductionDataType, StoreState } from "../../types";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export const CartContainer = () => {
  const { cart } = useSelector((state: StoreState) => state?.marketVista);

  return (
    <div>
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="w-full">
            {cart.map((item: ProductionDataType, index) => (
              <CartItem item={item} key={index} />
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <div>No product</div>
      )}
    </div>
  );
};
