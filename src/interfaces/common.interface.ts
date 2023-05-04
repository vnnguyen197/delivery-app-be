import { STATUS } from "@/utils/constant";

export interface IQuery {
  page?: number;
  limit?: number;
  status?: STATUS;
}
