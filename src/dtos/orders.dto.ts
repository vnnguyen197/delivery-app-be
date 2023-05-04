import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsNumber()
  @IsNotEmpty()
  public productVolume: number;
  @IsString()
  @IsNotEmpty()
  public description: string;
  @IsString()
  @IsNotEmpty()
  public senderName: string;
  @IsString()
  @IsNotEmpty()
  public senderPhone: string;
  @IsString()
  @IsNotEmpty()
  public senderAddress: string;
  @IsString()
  @IsNotEmpty()
  public receiverName: string;
  @IsString()
  @IsNotEmpty()
  public receiverPhone: string;
  @IsString()
  @IsNotEmpty()
  public receiverAddress: string;
 
}

export { CreateOrderDto };
