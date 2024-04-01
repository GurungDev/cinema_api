import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CinemaPatchDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email: string;
}