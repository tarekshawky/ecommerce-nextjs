'use client'
import useCartService from "@/lib/hooks/useCartStore";
import {OrderItem} from '@/lib/models/OrderModel'
import {useRouter} from 'next/navigation'
import { useEffect, useState } from "react";

export default function AddToCart({item}: {item: OrderItem}){
    const router = useRouter()
    const {items, increase} = useCartService()
    const [existItem, setExistItem] = useState<OrderItem | undefined>()
    useEffect(() => {
        setExistItem(items.find((x) => x.slug === item.slug))
    }, [item,items])

    const addToCartHandler = () => {
        increase(item)
    }
    return existItem ? (
        <div>
            <button>-</button>
            <span>{existItem.qty}</span>
            <button onClick={()=> increase(existItem)}>
                +
            </button>

        </div>
    ) : (
        <button
        onClick={addToCartHandler}
        >
            Add To Cart
        </button>
    )
}