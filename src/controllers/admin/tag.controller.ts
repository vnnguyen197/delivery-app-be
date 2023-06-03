import AdminTagService from '@/services/admin/tag.service';
import { NextFunction, Request, Response } from 'express';

class AdminTagController {
  public tagService = new AdminTagService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const created = await this.tagService.create(data);
      res.status(201).json({ data: created, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.getAll();
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { id } = req.params;
      const updated = await this.tagService.update(data, id);
      res.status(200).json({ data: updated, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.tagService.deleteOne(id);
      res.status(200).json({ data: { message: 'Deleted tag successfully' }, message: 'success' });
    } catch (error) {}
  };
}

export default AdminTagController;
