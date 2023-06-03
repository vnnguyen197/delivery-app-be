import { IsOptional, IsString } from 'class-validator';

class CreatTagDto {
  @IsString({ message: 'Name tag is not null' })
  public name: string;
}

class UpdateTagDto {
  @IsString({ message: 'Name tag is not null' })
  @IsOptional()
  public name: string;
}

export { CreatTagDto, UpdateTagDto };
