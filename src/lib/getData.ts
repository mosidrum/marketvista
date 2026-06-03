import { client } from "@/sanity/lib/client";
import { bannerQuery, bestSellersQuery, productQuery } from "./query";

export const revalidate = 60;

export const getBannerData = async () => await client.fetch(bannerQuery);

export const getProductData = async () => await client.fetch(productQuery);

export const getBestSellersData = async () => await client.fetch(bestSellersQuery);
