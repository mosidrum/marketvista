import { groq } from "next-sanity";

export const bannerQuery = groq`*[_type == 'banner']{
    ...
}|order(_createdAt asc) `;

export const productQuery = groq`*[_type == 'product']{
    ...
}|order(_createdAt asc) `;

export const bestSellersQuery = groq`*[_type == 'product' && position == 'Bestseller' ]{
    ...
}|order(_createdAt asc) `;