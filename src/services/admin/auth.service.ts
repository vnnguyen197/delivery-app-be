import { CreateModeratorDto } from '@/dtos/admin/moderator.dto';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Moderator, PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class AdminAuthService {
  public moderator = new PrismaClient().moderator;

  public async login(data: CreateModeratorDto): Promise<{ accessToken: string; findUser: Moderator }> {
    const findUser: Moderator = await this.moderator.findUnique({ where: { email: data.email } });
    if (!findUser) throw new HttpException(409, `This email ${data.email} was not found`, false);

    if (data.password !== findUser.password) throw new HttpException(409, 'Password is not matching', false);

    const accessToken = this.createToken(findUser);

    return { accessToken: accessToken.token, findUser };
  }

  public createToken(user: Moderator): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 360;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AdminAuthService;
