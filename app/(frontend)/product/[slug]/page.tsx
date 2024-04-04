import data from '@/lib/data'
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import AddToCart from '@/components/AddToCart';
import productService from '@/lib/services/ProductService';
import { convertDocToObj } from '@/lib/utils';


export async function generateMetadata({params,}: {params:{slug:string}}) {
    const product = await productService.getBySlug(params.slug)
    if(!product){
        return {
            title:'Product not Found'
        }
    }
    return{
        title:product.name,
        description: product.description
    }

}

export default async function productDetails({params}:{params:{slug:string}}) {
    const product = await productService.getBySlug(params.slug)
    if(!product){
        return <div>Product not Found</div>
    }
  return (
   <div className='max-w-6xl mx-auto px-4'>
    <div>
        <Link href='/'> Back To Product</Link>
    </div>
    <div className='grid md:grid-cols-4 md:gap-4'>
        <div className='md:col-span-2'>
            <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
                width:'100%',
                height:'auto'
            }}
            ></Image>
        </div>
        <div className='md:col-span-2'>
            <ul className='space-y-4'>
                <li>
                    <h1>{product.name}</h1>
                </li>
                <li>
                   {product.rating} of {product.numReviews}
                </li>
                <li>
                    {product.brand}
                </li>
                <li>
                    <div className='divider'></div>
                </li>
                <li>
                    Description: <p>{product.description}</p>
                </li>
            </ul>
        </div>
        <div>
            <div>
                <div>
                    <div>Price</div>
                    <div>${product.price}</div>
                </div>
            </div>
        </div>
        <div>
            <div>Status</div>
            <div>
                {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
            </div>
            <div>
            <AddToCart item={{...convertDocToObj(product), qty:0 , color: '' , size: ''}}/>

            </div>
        </div>
    </div>
   </div>
  )
}
