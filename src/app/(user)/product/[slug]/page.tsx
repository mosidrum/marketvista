import { AddToCartButton, Container, FormattedPrice } from "@/app/components";
import { ProductCard } from "@/app/components/products/ProductCard";
import { ProductionDataType } from "@/app/types";
import { getBestSellersData } from "@/lib";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import { MdStar } from "react-icons/md";

interface Props {
  params: {
    slug: string;
  };
}

export default async function SingleProduct({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
  ...
  }`;
  const product: ProductionDataType = await client.fetch(query, { slug });
  const bestSellersProducts: ProductionDataType[] = await getBestSellersData();

  console.log({ product });

  return (
    <Container className="my-10 bg-bgLight">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full p-4 ">
        <div className="h-ful xl:col-span-2">
          <Image
            src={urlFor(product?.image).url()}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-5">
            <h2>{product?.title}</h2>
            <div className="flex items-center gap-4">
              <p className="text-lg font-normal text-gray-500 line-through">
                <FormattedPrice amount={product.rowprice} />
              </p>
              <FormattedPrice
                amount={product.price}
                className="text-lg font-bold"
              />
              <p className="text-sm">
                You saved {""}
                <FormattedPrice
                  amount={product?.rowprice - product?.price}
                  className="bg-lightGreen text-white px-2 rounded-md text-xs py-1"
                />
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-base text-lightText flex items-center">
                {Array?.from({ length: 5 }).map((_, index) => {
                  const filled = index + 1 <= Math.floor(product.ratings);
                  const halfFilled =
                    index + 1 > Math.floor(product.ratings) &&
                    index < Math.ceil(product.ratings);
                  return (
                    <MdStar
                      className={`${filled ? "text-[#fa8900]" : halfFilled ? "text-[#deb889]" : "text-lightText"}`}
                      key={index}
                    />
                  );
                })}
              </div>
              <p className="text-sm font-semibold text-accent tracking-wide">
                5 customer reviews
              </p>
            </div>
            <p className="text-sm tracking-wide text-gray-600">
              {product.description}
            </p>
            <p className="text-sm text-gray-500">
              Be the first to leave a review
            </p>
            <AddToCartButton item={product} className="rounded-md py-3" />
            <p className="font-normal text-sm">
              <span className="font-medium text-base">Categories:</span>
              Spring, collection, Streetwears, women Tags: feautured SKU: N/A
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {bestSellersProducts.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </Container>
  );
}
