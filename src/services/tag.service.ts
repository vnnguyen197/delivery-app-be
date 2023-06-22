import { CreatTagDto, UpdateTagDto } from '@/dtos/admin/tag.dto';
import { HttpException } from '@/exceptions/HttpException';
import { PrismaClient, Tags } from '@prisma/client';

class TagService {
  public tag = new PrismaClient().tags;

  /**
   * async getAll
   */
  public async getAll(): Promise<Tags[]> {
    const listData = await this.tag.findMany();
    return listData;
  }
}

export default TagService;
