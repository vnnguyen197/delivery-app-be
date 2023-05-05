import OrderController from '@/controllers/order.controller';
import { CreateOrderDto, UpdateStatus } from '@/dtos/orders.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class OrderRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateOrderDto, 'body'), this.orderController.create);
    this.router.get(`${this.path}`, authMiddleware, this.orderController.getlist);
    this.router.patch(`${this.path}//:id(\\d+)`, authMiddleware, validationMiddleware(UpdateStatus, 'body'), this.orderController.updateStatus);
  }
}

export default OrderRoute;
