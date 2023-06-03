import { CreateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IQuery } from '@/interfaces/common.interface';
import { ResponseOrder } from '@/interfaces/order.interface';
import { ROLE } from '@/utils/constant';
import { queryPagination } from '@/utils/util';
import { Orders, PrismaClient, STATUS } from '@prisma/client';
import { isEmpty } from 'class-validator';

class AdminOrderService {
  public orders = new PrismaClient().orders;
  public user = new PrismaClient().user;

  public async findAllOrder(query: IQuery): Promise<ResponseOrder> {
    const { take, skip } = queryPagination(query);
    const { status } = query;
    const condition = {
      take,
      skip,
      where: {
        status,
      },
    };

    const count = await this.orders.count();
    const rows: Orders[] = await this.orders.findMany({
      ...condition,
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
    });
    return { rows, count, page: query.page ?? 1 };
  }
  
}

export default AdminOrderService;
