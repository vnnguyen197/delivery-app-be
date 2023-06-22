import TagService from '@/services/tag.service';
import { NextFunction, Request, Response } from 'express';

class TagController {
  public tagService = new TagService();

  public getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.getAll();
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

}

export default TagController;
