import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe";
import {ProductionDataType} from "@/app";
export const POST = async (request: NextRequest) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    try {
        const {items, email} = await request.json();

        const line_items = items?.map((item: ProductionDataType) => ({
            price_data: {
                currency: 'usd',
                unit_amount: Math.round(item?.price * 100),
                product_data: {
                    name: item?.title,
                    description: item?.description,
                },
            },
            quantity: item?.quantity,
        }));

        const origin = request.headers.get("origin");
        console.log(origin);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'afterpay_clearpay', 'amazon_pay'],
            mode: 'payment',
            line_items: line_items,
            success_url: `${origin}/success/session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cancel/?canceled=true`,
            metadata: {
                email: email,
            }
        })
        return NextResponse.json({ url: session?.url }, {status: 200})
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({error: error?.message || String(error)}, {status: 500})
    }
}