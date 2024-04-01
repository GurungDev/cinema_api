import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../common/class/error";
import { IdDto } from "../../common/validation/idValidation";
import { HallService, hallService } from "./hall.service";
import { HallRegisterDto } from "./hall.dto";
import { SeatService, seatService } from "../seat/seat.service";
import SeatEntity from "../seat/entities/seat.entity";
import { DeepPartial } from "typeorm";


export default class HallController {
    private readonly service: HallService
    private readonly seatService: SeatService
    constructor() {
        this.service = hallService;
        this.seatService = seatService
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, seats } = plainToInstance(HallRegisterDto, req.body);

            const cinemaId = req.userId;
            const hall = await this.service.createOne({ cinema: { id: cinemaId }, name });
            const seatList: DeepPartial<SeatEntity>[] = []
            seats.forEach((item) => {
                seatList.push({
                    seat_no: item,
                    hall: { id: hall.id }
                })
            })
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: hall
            });
            await this.seatService.createMany(seatList);


        } catch (error) {
            next(error)
        }
    }

    async updateHall(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, seats } = plainToInstance(HallRegisterDto, req.body);
            const { id } = plainToInstance(IdDto, req.params)
            const cinemaId = req.userId;
          
            const hall = await this.service.getById(id);
            if (!hall) {
                throw new Error("Hall not found.")
            }
            if (hall.cinema?.id != cinemaId) {
                throw new Error("You don't own this hall.")
            }

            hall.name = name;
            hall.save();
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: hall
            });

            await this.seatService.deleteAllByHallId(id);

            const seatList: DeepPartial<SeatEntity>[] = []
            seats.forEach((item) => {
                seatList.push({
                    seat_no: item,
                    hall: { id: hall.id }
                })
            })

            await this.seatService.createMany(seatList);


        } catch (error) {
            next(error)
        }
    }



    async getAccordingToCinema(req: Request, res: Response, next: NextFunction) {
        try {
            const cinemaId = req.userId;
            const hall = await this.service.getAllByCinemaId(cinemaId);
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: hall
            });

        } catch (error) {
            next(error)
        }
    }


    async deleteHall(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
            const cinemaId = req.userId;
            const hall = await this.service.delete(id, cinemaId);
            return res.status(200).json({
                success: true,
                message: "Sucess"
            });
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
            const hall = await this.service.getById(id);
            if (!hall) {
                throw new ExpressError(404, "Hall not found.")
            }
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: hall
            });

        } catch (error) {
            next(error)
        }
    }

}

export const hallController = new HallController();