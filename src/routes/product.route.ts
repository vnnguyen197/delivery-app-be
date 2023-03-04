import ProductController from '@/controllers/products.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, this.productController.create);
    this.router.get(`${this.path}/`, this.productController.getlist);
  }
}

export default ProductsRoute;
