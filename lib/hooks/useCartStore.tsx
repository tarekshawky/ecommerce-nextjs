import { create } from 'zustand'
import { round2 } from '../utils'
import { OrderItem, ShippingAddress } from '../models/OrderModel'
import { persist } from 'zustand/middleware'
type Cart = {
    items: OrderItem[]
    itemsPrice: number
    taxPrice:number
    shippingPrice: number
    totalPrice: number
    shippingAddress:ShippingAddress
    paymentMethod: string
}


const initialState: Cart = {
    items:[],
    itemsPrice: 0,
    taxPrice:0,
    shippingPrice: 0,
    totalPrice: 0,
    paymentMethod:'Paypal',
    shippingAddress:{
        fullName: '',
        address:'',
        city:'',
        postalCode:'',
        country:''
    },
}

export const cartStore = create<Cart>()(
    persist(() => initialState, {
        name: 'cartStore'
    })
)

export default function useCartService(){
    const {items, itemsPrice, taxPrice, shippingPrice, totalPrice,shippingAddress, paymentMethod} = cartStore()
    return{
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        shippingAddress,
        paymentMethod,
        increase: (item: OrderItem) => {
            const exist = items.find((x) => x.slug === item.slug)
            const updateCartItems = exist
                ? items.map((x) =>
                    x.slug === item.slug ? { ...exist, qty: exist.qty + 1} : x
                )
                : [...items, {...item,qty: 1}]
            const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calcPrice(updateCartItems)
            cartStore.setState({
                items:updateCartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })

        },
        decrease: (item: OrderItem) => {
            const exist = items.find((x) => x.slug === item.slug)
            if(!exist) return
            const updateCartItems = exist.qty === 1
            ? items.filter((x: OrderItem) => x.slug !== item.slug)
            : items.map((x) =>
                (
                    item.slug ? { ...exist, qty: exist.qty - 1 }
                    : x
                )
            )
            const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calcPrice(updateCartItems)
            cartStore.setState({
                items:updateCartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })
        },
        saveShippingAddrress: (shippingAddress: ShippingAddress)=>{
            cartStore.setState({
                shippingAddress
            })
        },
        savePaymentMethod: (paymentMethod: string)=>{
            cartStore.setState({
                paymentMethod,
            })
        }
    }
}

const calcPrice = (items: OrderItem[])=> {
 const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
 ),
  shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
  taxPrice = round2(Number(0.15 * itemsPrice)),
  totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return{ itemsPrice, shippingPrice, taxPrice , totalPrice}

}