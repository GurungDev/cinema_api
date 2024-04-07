import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { IdDto } from "../../../common/validation/idValidation";
import { SeatTakenService } from "./seat.taken.service";


export class SeatTakenController {

    private readonly seatService: SeatTakenService;
    constructor() {
        this.seatService = new SeatTakenService();
    }
    async getAllByReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params)
            const seats = await this.seatService.getAllByShowId(id);
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: seats
            });

        } catch (error) {
            next(error)
        }
    }
}

export const seatTakenController = new SeatTakenController();