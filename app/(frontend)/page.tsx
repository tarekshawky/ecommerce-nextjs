import HeroSection from "@/components/HeroSection";
import ProductItem from "@/components/ProductItem";
import data from "@/lib/data";
import Image from "next/image";
import { Metadata } from "next";
import productService from "@/lib/services/ProductService";
import Link from "next/link";
import { convertDocToObj } from "@/lib/utils";
export const metadata:Metadata = {
  title:process.env.NEXT_PUBLIC_APP_NAME || 'Ecommerce',
  description:process.env.NEXT_PUBLIC_APP_DESC || 'Ecommerce T-shirt And Shirt'
}
export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <>
<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header className="text-center">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">New Collection</h2>

      <p className="mx-auto mt-4 max-w-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
        dicta incidunt est ipsam, officia dolor fugit natus?
      </p>
    </header>
    <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
  {featuredProducts.slice(1).map((product, index) => (
    <li key={product._id} id={`slide-${index + 1}`}>
      <Link href={`/product/${product.slug}`} className="group relative block">
        {product.banner && (
          <Image
            className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
            src={product.banner}
            alt={product.name}
            width={1000}
            height={1000}
          />
        )}
      </Link>
    </li>
  ))}

  <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1" key={featuredProducts[0]._id} id={`slide-0`}>
    <Link className="group relative block" href={`/product/${featuredProducts[0].slug}`}>
      {featuredProducts[0].banner && (
        <Image
          className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
          src={featuredProducts[0].banner}
          alt={featuredProducts[0].name}
          width={1000}
          height={1000}
        />
      )}
    </Link>
  </li>
</ul>
  </div>
</section>

    <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 lg:px-8">      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
          {
             latestProducts.map((product)=>(
              <ProductItem key={product.slug} product={convertDocToObj(product)}/>
            ))
          }
      </div>
    </div>
    </>
  );
}
