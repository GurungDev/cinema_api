import { Exclude, Expose } from "class-transformer";
import { BaseSerializer } from "../../../common/baseSerializer/base.serializer";


@Exclude()
export class CinemaSerializer extends BaseSerializer{
    @Expose()
    name: string
    @Expose()
    email: string;
    @Expose()
    ownerName: string;
    @Expose()
    phone: number;
    @Expose()
    is_approved: boolean;
}