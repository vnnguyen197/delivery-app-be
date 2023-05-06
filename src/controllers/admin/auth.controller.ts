import AdminAuthService from '@/services/admin/auth.service';
import { CreateUserDto } from '@dtos/users.dto';
import { NextFunction, Request, Response } from 'express';

class AdminAuthController {
  public modService = new AdminAuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { accessToken } = await this.modService.login(userData);

      res.status(200).json({ status: 200, success: true, data: { accessToken }, message: 'login succesfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminAuthController;
