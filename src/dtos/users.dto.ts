import { IsDate, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

 class CreateUserDto {
   @IsEmail()
   public email: string;
   @IsString()
   public password: string;
   @IsString()
   public fullName: string;
   @IsString()
   public citizenId: string;
   @IsDateString()
   public citizenDate: Date;
   @IsString()
   public citizenAdd: string;
   @IsString()
   public role: string;
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
