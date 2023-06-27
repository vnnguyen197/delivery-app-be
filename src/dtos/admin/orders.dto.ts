import { UPDATE_STATUS_ORDER_ADMIN } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

class UpdateStatusOrder {
  @IsEnum(UPDATE_STATUS_ORDER_ADMIN)
  @IsNotEmpty()
  public status: string;
}

export { UpdateStatusOrder };
