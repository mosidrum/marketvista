'use client';

import {Loader, resetCart, StoreState} from "@/app";
import {useDispatch, useSelector} from "react-redux";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export const SuccessContainer = ({ id }: { id: string }) => {
     const {cart} = useSelector((state: StoreState) => state?.marketVista);
     const dispatch = useDispatch();
     const { data: session } = useSession();
     const [totalAmount, setTotalAmount] = useState(0);
     const [loading, setLoading] = useState(false);

    useEffect(() => {
        let price = 0;
        cart.map((item) => {
            price += item.price * item.quantity
            return price;
        });
        setTotalAmount(price);
    }, [cart]);

const handleSaveOrder = async () => {
    try{
        setLoading(true);
        const response = await fetch('/api/saveorder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
                email: session?.user?.email,
                totalAmount,
                id
            })
        });
        const data = await response.json();
        if(data?.success) {
            setLoading(false);
            dispatch(resetCart());
        }
    }catch(error) {
        console.error("Error saving order:", error);
    } finally {
        setLoading(false);
    }
}

    useEffect(() => {
        if(session?.user && cart.length) {
            handleSaveOrder()
        }
    }, [session?.user, cart.length, handleSaveOrder]);

    return (
        <div>
           <Loader title='passed in title' />
        </div>
    )
}
