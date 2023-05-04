import OrderController from '@/controllers/order.controller';
import { CreateOrderDto } from '@/dtos/orders.dto';
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
    // this.router.patch(`${this.path}`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
  }
}

export default OrderRoute;
