import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsString()
  @IsNotEmpty()
  public slug: string;
  @IsUUID()
  public childrenId: string;
}
