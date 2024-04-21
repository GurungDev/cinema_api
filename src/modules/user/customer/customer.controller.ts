import { CustomerService, customerService } from "./customer.service";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express"
import { ChangePasswordUSerDTO } from "./customer.dto";
export class CustomerController {
    private readonly service: CustomerService;
    constructor(){
        this.service = customerService
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.userId;
            const {password} = plainToInstance(ChangePasswordUSerDTO,req.body )
            const responseUser = await this.service.ChangePasswordBYId(userID, password);
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: responseUser
            });

        } catch (error) {
            next(error)
        }
    }

}

export const customerController = new CustomerController()