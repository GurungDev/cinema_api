import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested, ValidationOptions, registerDecorator } from "class-validator";

function IsSeatFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isSeatFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (!Array.isArray(value)) {
                        return false;
                    }
                    for (const seat of value) {
                        if (typeof seat !== 'string' || !/^[A-Z]\d+$/.test(seat)) {
                            return false;
                        }
                    }
                    return true;
                },
            },
        });
    };
}

export class HallRegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsArray()
    @Type(() => String)
    @IsSeatFormat({ message: 'Seats must be in the format "A1", "B2", etc.' })
    seats: string[];
}
