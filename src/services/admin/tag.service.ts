import { CreatTagDto } from '@/dtos/admin/tag.dto';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import { PrismaClient, Tags } from '@prisma/client';

class AdminTagService {
  public tag = new PrismaClient().tags;

  /**
   * create
   */
  public async create(data: CreatTagDto): Promise<Tags> {
    const tagCreated = await this.tag.create({data})
    return tagCreated;
  }

  /**
   * async getAll
   */
  public async getAll(): Promise<Tags[]> {
    const listData = await this.tag.findMany()
    return listData;
  }
}

export default AdminTagService