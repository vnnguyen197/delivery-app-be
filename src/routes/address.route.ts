import AddressController from '@/controllers/address.controller';
import TagController from '@/controllers/tag.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class AddressRoute implements Routes {
  public path = '/address';
  public router = Router();
  public addressContr = new AddressController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/province`,  this.addressContr.getProvince);
    this.router.get(`${this.path}/district/:provinceId`,  this.addressContr.getDistrict);
    this.router.get(`${this.path}/ward/:districtId`,  this.addressContr.getWard);
  }
}

export default AddressRoute;
