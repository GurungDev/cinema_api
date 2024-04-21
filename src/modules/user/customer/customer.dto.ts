import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordUSerDTO {
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  