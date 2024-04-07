import { plainToInstance } from "class-transformer";
import { SeatService, seatService } from "./seat.service";
import { NextFunction, Request, Response } from "express";
import { IdDto } from "../../common/validation/idValidation";

export class SeatController {
    private readonly service: SeatService;
    constructor(){
        this.service = seatService;
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(IdDto, req.params)
            const seats = await this.service.getAllByHallId(id);
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: seats
              });
          
        } catch (error) {
            next(error)
        }
    }


}

export const seatController = new SeatController();