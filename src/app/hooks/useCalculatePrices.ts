import { useMemo } from "react";
import { ProductionDataType } from "../types";

export const useCalculatePrices = (cart: ProductionDataType[]) => {
  const prices = useMemo(() => {
    const noDiscountIfAtMost = 1;
    const discountStartsAfter = 3;
    const discountPerItem = 0.01;
    const maxDiscountAllowed = 0.2;

    const originalTotal = cart.reduce(
      (sum, curr) => sum + curr.price * curr.quantity,
      0
    );

    const numberOfItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (numberOfItems <= noDiscountIfAtMost) {
      const deliveryFee = calculateDeliveryFee(originalTotal);
      return {
        finalPriceAfterDiscount: originalTotal,
        originalTotal,
        moneyToTakeOff: 0,
        numberOfItems,
        deliveryFee,
        grandTotal: originalTotal + deliveryFee,
      };
    }

    const itemsAboveThreshold = Math.max(
      0,
      numberOfItems - discountStartsAfter
    );
    const totalDiscountRate = Math.min(
      itemsAboveThreshold * discountPerItem,
      maxDiscountAllowed
    );
    const moneyToTakeOff = originalTotal * totalDiscountRate;
    const finalPriceAfterDiscount = originalTotal - moneyToTakeOff;
    const deliveryFee = calculateDeliveryFee(finalPriceAfterDiscount);

    return {
      originalTotal,
      moneyToTakeOff,
      numberOfItems,
      deliveryFee,
      grandTotal: finalPriceAfterDiscount + deliveryFee,
    };
  }, [cart]);

  return prices;
};

const calculateDeliveryFee = (finalPrice: number): number => {
  if (finalPrice < 2000) {
    return 0;
  }

  const baseDeliveryFee = 5;
  const deliveryThreshold = 2000;
  const additionalFeePerThousand = 2;
  const thousandIncrement = 1000;

  const excessAmount = finalPrice - deliveryThreshold;
  const additionalThousands = Math.floor(excessAmount / thousandIncrement);

  const deliveryFee =
    baseDeliveryFee + additionalThousands * additionalFeePerThousand;

  return deliveryFee;
};
