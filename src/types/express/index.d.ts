import { UserEnum } from "../../common/enum";
declare global{
     namespace Express {
    interface Request {
        userId: number;
        role: UserEnum;
    }
}}