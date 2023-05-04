import { CreateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IQuery } from '@/interfaces/common.interface';
import { ResponseOrder } from '@/interfaces/order.interface';
import { queryPagination } from '@/utils/util';
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

  public async findAllOrder(query: IQuery, userId): Promise<ResponseOrder> {
    const { take, skip } = queryPagination(query);
    const count = await this.orders.count();
    const rows: Orders[] = await this.orders.findMany({
      skip,
      take: take,
      where: {
        status: query.status,
        userCreated: userId,
      },
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
    });
    return { rows, count, page: query.page ?? 1 };
  }

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
