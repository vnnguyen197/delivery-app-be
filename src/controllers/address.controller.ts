import AddressService from '@/services/address.service';
import { NextFunction, Request, Response } from 'express';

class AddressController {
  public addressService = new AddressService();

  public getProvince = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.addressService.getProvince();
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getDistrict = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { provinceId } = req.params;
      const data = await this.addressService.getDistrict(+provinceId);
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getWard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { districtId } = req.params;
      const data = await this.addressService.getWard(+districtId);
      res.status(200).json({ data, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default AddressController;