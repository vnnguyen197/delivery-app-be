import AdminTagController from '@/controllers/admin/tag.controller';
import authAdminMiddleware from '@/middlewares/adminAuth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class AdminTagRoute implements Routes {
  public path = '/admin/tags';
  public router = Router();
  public tagController = new AdminTagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authAdminMiddleware, this.tagController.create);
    this.router.get(`${this.path}`, authAdminMiddleware, this.tagController.getList);
    this.router.patch(`${this.path}:id`, authAdminMiddleware, this.tagController.update);
    this.router.delete(`${this.path}:id`, authAdminMiddleware, this.tagController.delete);
  }
}

export default AdminTagRoute;
