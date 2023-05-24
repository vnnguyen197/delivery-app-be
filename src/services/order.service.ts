import { CreateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IQuery } from '@/interfaces/common.interface';
import { ResponseOrder } from '@/interfaces/order.interface';
import { ROLE } from '@/utils/constant';
import { Orders, PrismaClient, STATUS } from '@prisma/client';
import { isEmpty } from 'class-validator';

class OrderService {
  public orders = new PrismaClient().orders;
  public user = new PrismaClient().user;

  public async create(data: CreateOrderDto, idCreated: string): Promise<Orders> {
    if (isEmpty(data)) throw new HttpException(400, 'Data Order is empty', false);

    const { role } = await this.user.findUnique({ where: { id: idCreated } });
    if (role === ROLE.SHIPPER) throw new HttpException(401, "Shipper can't create order", false);

    const inputData = { ...data, userCreated: idCreated };

    const createdOrder = await this.orders.create({
      data: {
        ...inputData,
      },
    });
    return createdOrder;
  }

  public async findAllOrder(query: IQuery, userCreated): Promise<ResponseOrder> {
    const { role } = await this.user.findUnique({ where: { id: userCreated } });
    let condition = {};
    if (role && role === ROLE.USER) {
      condition = { ...query, userCreated };
    } else {
      if (query.status !== STATUS.WAITING) {
        condition = { ...query, shipper: userCreated };
      } else {
        condition = { ...query };
      }
    }

    const count = await this.orders.count();
    const rows: Orders[] = await this.orders.findMany({
      where: {
        ...condition,
      },
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
    });
    return { rows, count, page: query.page ?? 1 };
  }

  public async updateStatus(orderId: string, {status}, userId): Promise<Orders> {
    
    const findOrder: Orders = await this.orders.findUnique({ where: { id: orderId } });
    if (!findOrder) throw new HttpException(409, "Order doesn't exist", false);

    const findOrderShipping: Orders = await this.orders.findFirst({ where: { status: STATUS.SHIPPING } });

    const { role } = await this.user.findUnique({ where: { id: userId } });

    if (role === ROLE.SHIPPER && status !== STATUS.DONE && findOrderShipping) throw new HttpException(400, "you can't change status while you have the order", false);
    if (role === ROLE.USER && status !== STATUS.DONE && status !== STATUS.CANCEL) throw new HttpException(401, "User can't update status", false);
    if (role === ROLE.SHIPPER && status === STATUS.DONE) throw new HttpException(401, "Shipper can't update status done", false);

    let dataUpdate;

    if (role === ROLE.SHIPPER && status !== STATUS.DONE) {
      dataUpdate = {
        status, 
        shipper: userId
      }
    } else {
      dataUpdate = {
        status
      };
    }

    const updateOrder = await this.orders.update({ where: { id: orderId }, data: dataUpdate });
    return updateOrder;
  }

  public async getOrderById(orderId: string):Promise<Orders> {
   if (isEmpty(orderId)) throw new HttpException(400, 'OrderId is empty', false);

   const findOder: Orders = await this.orders.findUnique({ where: { id: orderId } });
   if (!findOder) throw new HttpException(409, "Order doesn't exist", false);

   return findOder;
  }
}

export default OrderService;
