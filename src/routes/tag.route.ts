import TagController from '@/controllers/tag.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class TagRoute implements Routes {
  public path = '/tags';
  public router = Router();
  public tagController = new TagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.tagController.getList);
  }
}

export default TagRoute;
