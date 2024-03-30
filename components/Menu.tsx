'use client'
import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
    const {items} = useCartService()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <div className="flex items-center gap-4">
            <div>
            <Link href='/cart'
                className="flex items-center gap-2 rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
                    Cart
                    {
                        mounted && items.length != 0 && (
                            <div className="bg-red-900 rounded-full px-2 py-1">
                                {items.reduce((a,c)=> a + c.qty, 0)} {''}
                            </div>
                        )
                    }
                </Link>
            </div>
            <div>
            <button className="block rounded-md bg-teal-600 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-teal-700">
                        Sign In
                    </button>
            </div>
    
        </div>
    )
}
export default Menu