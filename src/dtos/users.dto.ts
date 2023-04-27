import { GENDER, ROLE } from '@/utils/constant';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

 class CreateUserDto {
   @IsEmail()
   public email: string;
   @IsString()
   public password: string;
   @IsString()
   public fullName: string;
   @IsString()
   @IsOptional()
   public citizenId: string;
   @IsDateString()
   @IsOptional()
   public citizenDate: string;
   @IsString()
   @IsOptional()
   public citizenAdd: string;
   @IsEnum(ROLE)
   public role: string;
   @IsDateString()
   @IsOptional()
   public birthday: string;
   @IsString()
   public phoneNumber: string;
   @IsString()
   public address: string;
   @IsEnum(GENDER)
   public gender: string;
   @IsString()
   @IsOptional()
   public avatar: string;
} 
 
class UpdateUserDto {
  @IsString()
  @IsOptional()
  public fullName: string;
  @IsString()
  @IsOptional()
  public citizenId: string;
  @IsDateString()
  @IsOptional()
  public citizenDate: string;
  @IsString()
  @IsOptional()
  public citizenAdd: string;
  @IsEnum(ROLE)
  @IsOptional()
  public role: string;
  @IsDateString()
  @IsOptional()
  public birthday: string;
  @IsString()
  @IsOptional()
  public phoneNumber: string;
  @IsString()
  @IsOptional()
  public address: string;
  @IsEnum(GENDER)
  @IsOptional()
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

export { CreateUserDto, LoginUserDto, UpdateUserDto };

