import { RequestWithUser } from '@/interfaces/auth.interface';
import { IQuery } from '@/interfaces/common.interface';
import { ResponseListUser } from '@/interfaces/user.interface';
import AdminUserService from '@/services/admin/users.service';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class AdminUsersController {
  public userService = new AdminUserService();

  public getUsersByRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: IQuery = req.query;
      const findAllUsersData: ResponseListUser = await this.userService.findAllUser(query);

      res.status(200).json({ data: findAllUsersData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

}

export default AdminUsersController;
