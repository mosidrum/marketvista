import { ProductionDataType } from "@/app/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProductCard = ({ item }: { item: ProductionDataType }) => {
  return (
    <div className="border border-px border-lightText/40 rounded-md relative group overflow-hidden">
      <div>
        <Link href={`/product/${item?.slug.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt={item?.title}
            width={500}
            height={500}
            className="w-full h-72 object-cover group-hover:scale-105 hoverEffect"
          />
        </Link>
      </div>
    </div>
  );
};
