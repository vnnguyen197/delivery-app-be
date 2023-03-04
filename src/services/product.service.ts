import { CreateProductDto, ProductPricesDto } from "@/dtos/products.dto";
import { HttpException } from "@/exceptions/HttpException";
import { queryPagination } from "@/utils/util";
import { QueryProduct, ResponseList } from "@interfaces/product.interface";
import { Categories, PrismaClient, Product } from "@prisma/client";
import { isEmpty } from "class-validator";

class ProductService {
  public products = new PrismaClient().product;
  public categoriesPrisma = new PrismaClient().categories;

  public async createProduct(dataProduct: CreateProductDto): Promise<Product> {
    if (isEmpty(dataProduct)) throw new HttpException(400, 'Data product is empty', false);

    await this.checkCategory(dataProduct.categoryId);

    const listItemPrices = dataProduct.prices;
    const createdProduct = await this.products.create({
      data: {
        ...dataProduct,
        prices: {
          create: listItemPrices?.map((priceItem: ProductPricesDto) => ({
            name: priceItem.name,
            price: priceItem.price,
          })),
        },
      },
    });
    return createdProduct;
  }

  public async findAllProducts(query: QueryProduct): Promise<ResponseList> {
    const { take, skip } = queryPagination(query);
    const count = await this.products.count();
    const rows: Product[] = await this.products.findMany({
      skip,
      take: take,
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
    });
    return { rows, count, page: query.page ?? 1  };
  }

  /**
   * checkCategory
   */
  public async checkCategory(id?: string) {
    if (!id) throw new HttpException(401, `Category is not null`, false);

    const findCategory: Categories = await this.categoriesPrisma.findUnique({ where: { id } });
    if (!findCategory) throw new HttpException(401, `This category not exists`, false);
  }
}

export default ProductService