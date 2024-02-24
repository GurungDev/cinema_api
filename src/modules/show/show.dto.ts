import { Transform } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ShowTime } from "../../common/enum";

export class ShowRegisterDto{

 
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    hall_id: number;
 
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    movie_id: number;

    @IsNotEmpty()
    @IsISO8601()
    date: string;

    @IsNotEmpty()
    @IsEnum(ShowTime, { each: true }) // Specify `each: true` to validate each element in the array
    @ArrayMinSize(1) // Ensure the array is not empty
    start_time: ShowTime[];
}