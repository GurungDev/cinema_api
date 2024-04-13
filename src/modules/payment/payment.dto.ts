import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentDto {

    @IsNotEmpty()
    @IsArray()
    seats: Number[];

    @IsNotEmpty()
    @IsNumber()
    amountInRs: number;

    @IsNotEmpty()
    @IsString()
    pidx: string;
}