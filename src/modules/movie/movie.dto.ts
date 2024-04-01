import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GenreEnum, UserEnum } from "../../common/enum";
import { Transform } from "class-transformer";

export class MovieRegisterDto{
 
  
    @IsNotEmpty()
    @IsEnum(GenreEnum)
    genre: GenreEnum;
 
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    durationInMin: number;
}
 