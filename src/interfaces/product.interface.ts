import { Product } from "@prisma/client";

export interface QueryProduct {
  page?: number
  limit?: number 
}
export interface ResponseList {
  rows: Product[];
  count: number
  page: number
}