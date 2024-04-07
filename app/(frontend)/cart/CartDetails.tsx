'use client'

import useCartService from "@/lib/hooks/useCartStore"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export default function CartDetails(){
    const router = useRouter()
    const {items, itemsPrice, decrease,increase} = useCartService()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if(!mounted) return <></>
    return(
        <>
            <h1 className="text-center text-xl font-bold my-8">Shopping Cart</h1>
            {items.length === 0 ? (
                <div>
                    Cart is empty <Link href='/'>Go Shopping</Link>
                </div>
            ):(
                <div className="max-w-6xl mx-auto my-4">

                <div className="overflow-x-auto border p-4 rounded-md">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Item</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.slug}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                                    <Link href={`/product/${item.slug}`}>
                                        <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        className="m-auto rounded-full"
                                        >

                                        </Image>
                                        <span>
                                            {item.name} ({item.color} {item.size})
                                        </span>
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                    <button onClick={()=> decrease(item)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={()=> increase(item)}>+</button>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                    $ {item.price}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>
                <div className="flex flex-col gap-4 my-8">
                    <div>
                            Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                      {itemsPrice}
                    </div>
                    <div>
                        <button onClick={()=> router.push('/shipping')} className="bg-gray-900 hover:bg-gray-700 cursor-pointer text-white p-4 rounded-md">Proceed to Checkout</button>
                    </div>
                </div>
                </div>

            )}
        </>
    )
}