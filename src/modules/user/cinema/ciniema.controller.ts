import { plainToInstance } from "class-transformer";

import { NextFunction, Response, Request } from "express";
import { CinemaService, cinemaService } from "./cinema.service";
import { IdDto } from "../../../common/validation/idValidation";
import { ExpressError } from "../../../common/class/error";
import { CinemaPatchDto } from "./cinema.dto";

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

            const responseCinema = await this.service.findBYId(id);

            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: responseCinema
            });

        } catch (error) {
            next(error)
        }
    }

    async getByCinema(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId

            const responseCinema = await this.service.findBYId(id);

            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: responseCinema
            });

        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId
            const { name, email, address } = plainToInstance(
                CinemaPatchDto,
                req.body
            );
            const responseCinema = await this.service.findBYId(id);
            if(!responseCinema){
                throw new ExpressError(404, "Cinema not found")
            }
            if (name) {
                responseCinema.name = name;
            }
            if (email) {
                responseCinema.email = email;
            }
            if (address) {
                responseCinema.address = address;
            }
            await responseCinema.save()
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: responseCinema
            });

        } catch (error) {
            next(error)
        }
    }

    async changeSatatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params)

            const responseCinema = await this.service.findBYId(id);
            if (!responseCinema) {
                throw new ExpressError(404, "Cinema not found.")
            }
            responseCinema.isActive = !responseCinema?.isActive;
            await responseCinema.save();
            return res.status(200).json({
                success: true,
                message: "Sucess"
            });

        } catch (error) {
            next(error)
        }
    }
}

export const cinemaController = new CinemaController();