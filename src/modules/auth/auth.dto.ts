import { Transform } from "class-transformer";
import {
  IsByteLength,
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { OtpPurpose, UserEnum } from "../../common/enum";

export class CinemaRegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  
  @IsNotEmpty()
  @IsString()
  address:string;
 

  @IsNotEmpty()
  @IsString()
  email: string;


}

export class CinemaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class CustomerRegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  
  @IsNotEmpty()
  @IsString()
  otp: string;

  @Transform(({ value }) => {
    return value && value.trim();
  })
  @IsString()
  @IsByteLength(10, 10)
  phone: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserEnum)
  validateFor: UserEnum;
}

export class OtpDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;

  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
