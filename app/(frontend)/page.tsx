import HeroSection from "@/components/HeroSection";
import ProductItem from "@/components/ProductItem";
import data from "@/lib/data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 lg:px-8">      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
          {
            data.products.map((product)=>(
              <ProductItem key={product.slug} product={product}/>
            ))
          }
      </div>
    </div>
  );
}
