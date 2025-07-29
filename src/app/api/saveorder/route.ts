import { adminDB } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    console.log("I was called Post");
    const reqBody = await request.json();
    const { cart, id, email, totalAmount } = reqBody;

    console.log(cart, id, email, totalAmount);

    // if (cart?.length) {
    //   const orderItem = {
    //     amount: totalAmount,
    //     items: cart,
    //   };

    //   const userOrderRef = adminDB
    //     .collection("users")
    //     .doc(email)
    //     .collection("orders")
    //     .doc(id);

    //   const userDoc = await userOrderRef.get();
    //   if (!userDoc.exists) {
    //     await userOrderRef.set({ email });
    //   }

    //   await userOrderRef.set({ value: orderItem }, { merge: true });
    // }

    return NextResponse.json(
      {
        success: true,
        message: "Order saved successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save order",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
