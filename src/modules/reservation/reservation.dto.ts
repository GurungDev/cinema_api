import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidationOptions, registerDecorator } from "class-validator";
import { SeatStatus } from "../../common/enum";

 

export class ResevationDto {
    @IsNotEmpty()
    @IsEnum(SeatStatus)
    status: SeatStatus;

    @IsNotEmpty()
    @IsArray()
    seats: Number[];
}
