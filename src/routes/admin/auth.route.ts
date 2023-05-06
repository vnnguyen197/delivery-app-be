import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import AdminAuthController from '@/controllers/admin/auth.controller';
import { LoginAdminDto } from '@/dtos/admin/moderator.dto';

class AdminAuthRoute implements Routes {
  public path = '/admin/auth';
  public router = Router();
  public modAuthController = new AdminAuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LoginAdminDto, 'body'), this.modAuthController.logIn);
  }
}

export default AdminAuthRoute;
