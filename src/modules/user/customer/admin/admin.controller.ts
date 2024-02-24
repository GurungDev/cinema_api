import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../../common/class/error";
import { IdDto } from "../../../../common/validation/idValidation";
import { AdminCustomerService, adminCustomerService } from "./admin.service";

export default class AdminStoreController{
    private readonly service: AdminCustomerService;
    constructor(){
        this.service = adminCustomerService;
    }

 

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const customers = await this.service.getAllCustomer();
            const serealized = this.service.transformMany(customers)
        
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: serealized
              });
            
        } catch (error) {
            next(error)
        }
    }

    async getCount(req: Request, res: Response, next: NextFunction){
        try {
            const cinemaCount = await this.service.getCustomerNumber();
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: cinemaCount
              });
     
        } catch (error) {
            next(error)
        }
    }


    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(IdDto, req.params)
    
        const responseCustomer = await this.service.findBYId(id );
        if(!responseCustomer){
            throw new ExpressError(404, "Customer not found")
        }
        return res.status(200).json({
            success: true,
            message: "Sucess",
            data: responseCustomer
          });
      
        } catch (error) {
            next(error)
        }
    }
}

export const adminStoreController  = new AdminStoreController();