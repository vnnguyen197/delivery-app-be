import { CreateOrderDto } from '@/dtos/orders.dto';
import { CreateProductDto } from '@/dtos/products.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { QueryProduct, ResponseList } from '@/interfaces/product.interface';
import OrderService from '@/services/order.service';
import { Orders, Product } from '@prisma/client';
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
  // public getlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const query: QueryProduct = req.query;
  //     const createUserData: ResponseList = await this.productService.findAllProducts(query);

  //     res.status(201).json({ data: createUserData, message: 'success' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default OrderController;
