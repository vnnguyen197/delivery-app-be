import AdminOrderController from '@/controllers/admin/order.controller';
import OrderController from '@/controllers/order.controller';
import { CreateOrderDto, UpdateStatus } from '@/dtos/orders.dto'  ;
import authAdminMiddleware from '@/middlewares/adminAuth.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AdminOrderRoute implements Routes {
  public path = '/admin/orders';
  public router = Router();
  public orderController = new AdminOrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authAdminMiddleware, this.orderController.getAll);
  }
}

export default AdminOrderRoute;
