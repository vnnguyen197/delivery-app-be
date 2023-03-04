import { CreateProductDto } from "@/dtos/products.dto";
import { QueryProduct, ResponseList } from "@/interfaces/product.interface";
import ProductService from "@/services/product.service";
import { Product } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

class ProductController {
  public productService = new ProductService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: CreateProductDto  = req.body;
      const createUserData: Product = await this.productService.createProduct(productData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * getlist
   */
  public getlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: QueryProduct = req.query;
      const createUserData: ResponseList= await this.productService.findAllProducts(query);

      res.status(201).json({ data: createUserData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  
}


export default ProductController;