import { Orders } from '@prisma/client';

export interface ResponseOrder {
  rows: Orders[];
  count: number;
  page: number;
}
