import { plainToInstance } from "class-transformer";

import { NextFunction, Response, Request } from "express";
import { CinemaService, cinemaService } from "./cinema.service";
import { IdDto } from "../../../common/validation/idValidation";
import { ExpressError } from "../../../common/class/error";

export default class CinemaController {
    private readonly service: CinemaService;
    constructor() {
        this.service = cinemaService;
    }



    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const cinema = await this.service.getAllCinema();
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: cinema
            });

        } catch (error) {
            next(error)
        }
    }


    async getCount(req: Request, res: Response, next: NextFunction) {
        try {
            const cinemaNumber = await this.service.getCinemaCount();
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: cinemaNumber
            });

        } catch (error) {
            next(error)
        }
    }


    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params)

            const responseStore = await this.service.findBYId(id);

            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: responseStore
            });

        } catch (error) {
            next(error)
        }
    }
}

export const cinemaController = new CinemaController();