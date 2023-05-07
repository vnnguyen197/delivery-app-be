import AdminUsersController from '@/controllers/admin/users.controller';
import authAdminMiddleware from '@/middlewares/adminAuth.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class AdminUsersRoute implements Routes {
  public path = '/admin/users';
  public router = Router();
  public usersController = new AdminUsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authAdminMiddleware, this.usersController.getUsersByRole);
  }
}

export default AdminUsersRoute;
