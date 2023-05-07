import { User } from "@prisma/client";

export interface QueryProduct {
  page?: number
  limit?: number 
}
export interface ResponseListUser {
  rows: User[];
  count: number
  page: number
}