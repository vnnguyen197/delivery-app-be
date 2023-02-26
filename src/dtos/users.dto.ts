import { IsDate, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

 class CreateUserDto {
   @IsEmail()
   public email: string;
   @IsString()
   public password: string;
   @IsString()
   public firstName: string;
   @IsString()
   public lastName: string;
   @IsDateString()
   public birthday: Date;
   @IsString()
   public phoneNumber: string;
   @IsString()
   public address: string;
   @IsString()
   public gender: string;
   @IsString()
   @IsOptional()
   public avatar: string;
 } 

class LoginUserDto {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
}

export { CreateUserDto, LoginUserDto };
