import { GENDER } from "@/utils/constant";
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

class CreateModeratorDto {
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

class LoginAdminDto {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
}

export { CreateModeratorDto, LoginAdminDto };