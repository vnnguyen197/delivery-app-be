import { HttpException } from '@/exceptions/HttpException';
import { District, PrismaClient, Province, Tags, Ward } from '@prisma/client';
import { isEmpty } from 'class-validator';

class AddressService {
  public province = new PrismaClient().province;
  public district = new PrismaClient().district;
  public ward = new PrismaClient().ward;

  public async getProvince(): Promise<Province[]> {
    const listData = await this.province.findMany();
    return listData;
  }

  public async getDistrict(provinceId: number): Promise<District[]> {
    if (isEmpty(provinceId)) throw new HttpException(200, 'provinceId is empty', false);

    const provice = await this.province.findUnique({ where: { id: provinceId } });
    if (!provice) throw new HttpException(400, 'Province is not exists', false);

    const listData = await this.district.findMany({ where: { provinceId } });
    return listData;
  }

  public async getWard(districtId: number): Promise<Ward[]> {
    if (isEmpty(districtId)) throw new HttpException(200, 'districtId is empty', false);

    const district = await this.district.findUnique({ where: { id: districtId } });
    if (!district) throw new HttpException(400, 'District is not exists', false);

    const listData = await this.ward.findMany({ where: { districtId } });
    return listData;
  }
}

export default AddressService;
