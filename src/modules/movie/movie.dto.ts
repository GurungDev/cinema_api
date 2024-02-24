import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GenreEnum, UserEnum } from "../../common/enum";

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
    @IsNumber()
    durationInMin: number;
}

 