import { STATUS } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';


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
  public senderStreet: string;
  @IsNumber()
  @IsNotEmpty()
  public provinceSenderId: number;
  @IsNumber()
  @IsNotEmpty()
  public districtSenderId: number;
  @IsNumber()
  @IsNotEmpty()
  public wardSenderId: number;
  @IsString()
  @IsNotEmpty()
  public receiverName: string;
  @IsString()
  @IsNotEmpty()
  public receiverPhone: string;
  @IsString()
  @IsNotEmpty()
  public receiverStreet: string;
  @IsNumber()
  @IsNotEmpty()
  public provinceReceiverId: number;
  @IsNumber()
  @IsNotEmpty()
  public districtReceiverId: number;
  @IsNumber()
  @IsNotEmpty()
  public wardReceiverId: number;
  @IsArray()
  @IsNotEmpty()
  public tags: string[];
}

class UpdateStatus {
  @IsEnum(STATUS)
  @IsNotEmpty()
  public status: string;
}

export { CreateOrderDto, UpdateStatus };
