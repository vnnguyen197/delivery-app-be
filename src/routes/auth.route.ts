import AuthController from '@controllers/auth.controller';
import { ChagePassword, CreateUserDto, LoginUserDto, SendOTP, VerifyOTP } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}/send-otp`, validationMiddleware(SendOTP, 'body'), this.authController.sendOtp);
    this.router.post(`${this.path}/verify-otp`, validationMiddleware(VerifyOTP, 'body'), this.authController.verifyOTP);
    this.router.post(`${this.path}/change-password`, validationMiddleware(ChagePassword, 'body'), this.authController.changePassword);
  }
}

export default AuthRoute;
