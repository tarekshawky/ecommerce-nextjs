import Image from "next/image";
import Link from "next/link";
import {Product} from "@/lib/models/ProductModel"
export default function ProductItem({product}:{product:Product}){
    return(
        <div>
            <figure>
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
                <div>
                    <Link href={`/product/${product.slug}`}>
                        <h2>{product.name}</h2>
                      
                      </Link>
                      <p>{product.brand}</p>
                        <p>$ {product.price}</p>
                    </div>
            </figure>
        </div>
    )
}