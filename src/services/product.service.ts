import { Prisma, PrismaClient } from "@prisma/client";

class ProductService {
  public products = new PrismaClient().product

}