import Image from "next/image";
import Link from "next/link";
import {Product} from "@/lib/models/ProductModel"
export default function ProductItem({product}:{product:Product}){
    return(
        <div>
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <Link href={`/product/${product.slug}`}>
                    <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover h-64 w-full"
                    >
                    </Image>
                </Link>

                <div className="bg-white p-4 sm:p-6">

                    <a href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900">How to position your furniture for positivity</h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {product.brand}
                    </p>
                    <p className="text-gray-500">$ {product.price}</p>

                </div>
                </article>
        
        </div>
    )
}