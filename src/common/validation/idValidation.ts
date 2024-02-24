import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class IdDto {
  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
