import { PrismaClient, Tags } from '@prisma/client';

class TagService {
  public tag = new PrismaClient().tags;

  /**
   * async getAll
   */
  public async getAll(): Promise<Tags[]> {
    const listData = await this.tag.findMany({orderBy: {
      createdAt: 'desc'
    }});
    return listData;
  }
}

export default TagService;
