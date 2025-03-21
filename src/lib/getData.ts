import { client } from "@/sanity/lib/client";
import { bannerQuery, bestSellersQuery, productQuery } from "./query";

export const revalidation = 0;

export const getBannerData = async () => await client.fetch(bannerQuery);

export const getProductData = async () => await client.fetch(productQuery);

export const getBestSellersData = async () => await client.fetch(bestSellersQuery);
