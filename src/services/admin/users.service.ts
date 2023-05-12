import { IQuery } from '@/interfaces/common.interface';
import { ResponseListUser } from '@/interfaces/user.interface';
import { HttpException } from '@exceptions/HttpException';
import { PrismaClient, User } from '@prisma/client';
import { isEmpty, queryPagination } from '@utils/util';

class AdminUserService {
  public users = new PrismaClient().user;

  public async findAllUser(query: IQuery): Promise<ResponseListUser> {
    const { take, skip } = queryPagination(query);
    const { role, search } = query;

    let searchCondition;

    if (search && search !== '') {
      searchCondition = [
        {
          fullName: {
            contains: search,
          },
        },
        {
          phoneNumber: { contains: search },
        },
      ];
    }

    const count = await this.users.count({ where: { role, OR: searchCondition } });

    const rows: User[] = await this.users.findMany({
      take,
      skip,
      where: {
        role,
        OR: searchCondition,
      },
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
    });
    return { rows, count, page: query.page ?? 1 };
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty', false);

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist", false);

    return findUser;
  }
}

export default AdminUserService;
