import { mailOTP } from '@/config/email';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Otp, PrismaClient, User } from '@prisma/client';
import { checkExpiredTime, generateOTP, isEmpty } from '@utils/util';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class AuthService {
  public users = new PrismaClient().user;
  public otps = new PrismaClient().otp;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty', false);

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`, false);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ accessToken: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty', false);

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`, false);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching', false);

    const accessToken = this.createToken(findUser);

    return { accessToken: accessToken.token, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty', false);

    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist", false);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 360;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async sendOtp(email: string): Promise<boolean> {
    const findUser: User = await this.users.findUnique({ where: { email: email } });
    if (!findUser) throw new HttpException(409, `This email ${email} doesn't exists`, false);
    const otpGenerated = generateOTP(4);

    let otpInfor: Otp = await this.otps.findUnique({ where: { email: email } });

    if (otpInfor) {
      otpInfor = await this.otps.update({ where: { email }, data: { otp: otpGenerated, isVerified: false } });
    } else {
      otpInfor = await this.otps.create({ data: { email, otp: otpGenerated } });
    }
    await mailOTP(email, otpInfor.otp);
    return true;
  }

  public async verifyOtp(email: string, otp: string): Promise<boolean> {
    let otpInfor: Otp = await this.otps.findUnique({ where: { email: email } });
    if (!otpInfor) throw new HttpException(409, `This email ${email} doesn't exists`, false);

    if (checkExpiredTime(otpInfor.updatedAt.getTime())) {
      throw new HttpException(409, `This OTP has expired`, false);
    }

    if (otpInfor.otp === otp) {
      await this.otps.update({ where: { email }, data: { isVerified: true } });
      return true;
    } else {
      throw new HttpException(400, `OTP incorrect!`, false);
    }
  }

  public async updatePassword(email: string, password: string): Promise<boolean> {
    let otpInfor: Otp = await this.otps.findUnique({ where: { email: email } });
    if (!otpInfor) throw new HttpException(409, `This email ${email} doesn't exists`, false);

    if (!otpInfor.isVerified) throw new HttpException(401, `OTP is not verified!`, false);

    if (checkExpiredTime(otpInfor.updatedAt.getTime())) {
      await this.otps.update({ where: { email }, data: { isVerified: false } });
      throw new HttpException(401, `Password change session has expired`, false);
    }

    const hashedPassword = await hash(password, 10);
    await this.users.update({ where: { email }, data: { password: hashedPassword } });

    return true;
  }
}

export default AuthService;
