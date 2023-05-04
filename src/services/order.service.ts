import { CreateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Orders, PrismaClient } from '@prisma/client';
import { isEmpty } from 'class-validator';

class OrderService {
  public orders = new PrismaClient().orders;

  public async create(data: CreateOrderDto, idCreated: string): Promise<Orders> {
    if (isEmpty(data)) throw new HttpException(400, 'Data Order is empty', false);
    const inputData = { ...data, userCreated: idCreated }; 

    const createdOrder = await this.orders.create({
      data: {
        ...inputData,
      },
    });
    return createdOrder;
  }

  // public async findAllProducts(query: QueryProduct): Promise<ResponseList> {
  //   const { take, skip } = queryPagination(query);
  //   const count = await this.products.count();
  //   const rows: Product[] = await this.products.findMany({
  //     skip,
  //     take: take,
  //     orderBy: [
  //       {
  //         updatedAt: 'desc',
  //       },
  //     ],
  //   });
  //   return { rows, count, page: query.page ?? 1 };
  // }

  /**
   * checkCategory
   */
  // public async checkCategory(id?: string) {
  //   if (!id) throw new HttpException(401, `Category is not null`, false);

  //   const findCategory: Categories = await this.categoriesPrisma.findUnique({ where: { id } });
  //   if (!findCategory) throw new HttpException(401, `This category not exists`, false);
  // }
}

export default OrderService;
