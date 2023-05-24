import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@prisma/client';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ message: 'signup', status: 201, success: true, data: signUpUserData });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { accessToken } = await this.authService.login(userData);

      res.status(200).json({ status: 200, success: true, data: { accessToken }, message: 'login succesfully' });
    } catch (error) {
      next(error);
    }
  };

  public sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.body.email;
      await this.authService.sendOtp(email);
      res.status(200).json({ status: 200, success: true, message: 'Send OTP successfully!' });
    } catch (error) {
      next(error);
    }
  };

  public verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, otp } = req.body;
      await this.authService.verifyOtp(email, otp);
      res.status(200).json({ status: 200, success: true, message: 'OTP verified succesfully!' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      await this.authService.updatePassword(email, password);
      res.status(200).json({ status: 200, success: true, message: 'Updated password succesfully!' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
