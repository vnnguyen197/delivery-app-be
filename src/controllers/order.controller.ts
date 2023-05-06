import { CreateOrderDto } from '@/dtos/orders.dto';
import { CreateProductDto } from '@/dtos/products.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { IQuery } from '@/interfaces/common.interface';
import { ResponseOrder } from '@/interfaces/order.interface';
import { QueryProduct, ResponseList } from '@/interfaces/product.interface';
import OrderService from '@/services/order.service';
import { Orders, Product, STATUS } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class OrderController {
  public orderService = new OrderService();

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateOrderDto = req.body;
      const userId = req.user.id;
      const createOrderData: Orders = await this.orderService.create(data, userId);

      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * getlist
   */
  public getlist = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: IQuery = req.query;
      const userId = req.user.id;
      const listData: ResponseOrder = await this.orderService.findAllOrder(query, userId);

      res.status(201).json({ data: listData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shipper = req.user.id;
      const orderId = req.params.id
      const data: {status: STATUS} = req.body;
      console.log("🚀 ~ file: order.controller.ts:46 ~ OrderController ~ updateStatus= ~ data:", data)
      const updateUserData: Orders = await this.orderService.updateStatus(orderId, data, shipper);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
