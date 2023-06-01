import AdminTagService from "@/services/admin/tag.service";
import { NextFunction, Request, Response } from "express";

class AdminTagController {
  public tagService = new AdminTagService()
  
  public create = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const created = await this.tagService.create(data)
      res.status(201).json({data: created, message: 'success' })
    } catch (error) {
      next(error);
    }
  }

  public getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.getAll()
      res.status(200).json({data, message: 'success'})
    } catch (error) {
      
    }
    
  }
}

export default AdminTagController