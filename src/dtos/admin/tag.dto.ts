import { IsString } from 'class-validator';

class CreatTagDto {
  @IsString({message: "Name tag is not null"})
  public name: string;
}

export { CreatTagDto };
