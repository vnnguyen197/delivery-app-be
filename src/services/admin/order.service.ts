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

  public async updateStatus(id: string, status: STATUS): Promise<Orders> {
    if (isEmpty(status)) throw new HttpException(400, 'Status is empty', false);
   
    const findOrder: Orders = await this.orders.findUnique({ where: { id } });
    if (!findOrder) throw new HttpException(409, "Order doesn't exist", false);

    const updateOrder = await this.orders.update({
      where: { id },
      data: { status },
    });
    return updateOrder;
  }
}

export default AdminOrderService;
