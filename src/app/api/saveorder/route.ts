import { adminDB } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { cart, id, email, totalAmount } = reqBody;

    if (
      !id ||
      typeof id !== "string" ||
      !email ||
      typeof email !== "string" ||
      !Array.isArray(cart) ||
      cart.length === 0 ||
      typeof totalAmount !== "number" ||
      totalAmount <= 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    const orderItem = {
      amount: totalAmount,
      items: cart,
    };

    const userOrderRef = adminDB
      .collection("users")
      .doc(email)
      .collection("orders")
      .doc(id);

    const userDoc = await userOrderRef.get();
    if (!userDoc.exists) {
      await userOrderRef.set({ email });
    }

    await userOrderRef.set({ value: orderItem }, { merge: true });

    return NextResponse.json(
      { success: true, message: "Order saved successfully!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to save order" },
      { status: 500 }
    );
  }
};
