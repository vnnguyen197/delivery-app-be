import { CreatTagDto, UpdateTagDto } from '@/dtos/admin/tag.dto';
import { HttpException } from '@/exceptions/HttpException';
import { PrismaClient, Tags } from '@prisma/client';

class AdminTagService {
  public tag = new PrismaClient().tags;
  public order = new PrismaClient().orders;

  /**
   * create
   */
  public async create(data: CreatTagDto): Promise<Tags> {
    const tagCreated = await this.tag.create({ data });
    return tagCreated;
  }

  /**
   * async getAll
   */
  public async getAll(): Promise<Tags[]> {
    const listData = await this.tag.findMany({
      orderBy: {
      createdAt: 'desc'
    }});
    return listData;
  }

  public async update(data: UpdateTagDto, id: string): Promise<Tags> {
    const findTag = await this.tag.findUnique({ where: { id } });
    if (!findTag) throw new HttpException(409, 'The tag is not exists', false);
    const updated = await this.tag.update({ data, where: { id } });

    return updated;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const findTag = await this.tag.findUnique({ where: { id }, include: { orders: true } });
    if (!findTag) throw new HttpException(409, 'The tag is not exists', false);

    await this.tag.update({
       where: { id },
       data: { orders: { set: [] } },
     });
    
    await this.tag.delete({ where: { id } })
    
    return true;
  }
}

export default AdminTagService;
