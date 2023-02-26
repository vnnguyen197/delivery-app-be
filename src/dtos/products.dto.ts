import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

class ProductPricesDto {
  @IsString()
  public name: string
  @IsNumber()
  public price: number
}

class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsString()
  @IsOptional()
  public subTitle: string;
  @IsString()
  @IsNotEmpty()
  public imageUrl: string;
  @IsString()
  public description: string;
  @IsArray()
  @IsNotEmpty()
  public prices: ProductPricesDto[];
  @IsUUID()
  @IsNotEmpty()
  public categoryId: string;
  @IsNumber()
  @IsNotEmpty()
  public rate: number;
  @IsString()
  @IsNotEmpty()
  public status: string;
  @IsNumber()
  @IsNotEmpty()
  public size: string;
  @IsString()
  @IsNotEmpty()
  public slug: string;
}


export { CreateProductDto, ProductPricesDto };
