import { ResponseOrder } from '@/interfaces/order.interface';
import AdminOrderService from '@/services/admin/order.service';
import { NextFunction, Request, Response } from 'express';

class AdminOrderController {
  public orderService = new AdminOrderService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const data: ResponseOrder = await this.orderService.findAllOrder(query);

      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminOrderController;
