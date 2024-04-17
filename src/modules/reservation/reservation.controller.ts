import { plainToInstance } from "class-transformer";
import { ReservationService } from "./reservation.service";
import { NextFunction, Request, Response } from "express";
import { IdDto } from "../../common/validation/idValidation";
import { ResevationDto } from "./reservation.dto";
import { SeatTakenService } from "../seat/seat_taken/seat.taken.service";
import SeatTakenEntity from "../seat/seat_taken/entities/seat_taken.entity";

export class ReservationController {
    private readonly service: ReservationService;
    private readonly seatService: SeatTakenService;
    constructor() {
        this.service = new ReservationService();
        this.seatService = new SeatTakenService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params)
            const userId = req.userId;
            const { seats, status } = plainToInstance(ResevationDto, req.body)
            const reservation = await this.service.createOne({ show: { id: id }, customer: { id: userId }, status: status })
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: reservation
            });
            const seatList: SeatTakenEntity[] = []
            seats.forEach((seat) => {
                seatList.push(plainToInstance(SeatTakenEntity, { seat: { id: seat }, reservation: { id: reservation.id } }))
            })
            await this.seatService.createMany(seatList);
        } catch (error) {
            next(error)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params)

            const reservation = await this.service.getAllReservationByShowId(id)
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: reservation
            });

        } catch (error) {
            next(error)
        }
    }

    async getAllByAdmin(req: Request, res: Response, next: NextFunction) {
        try {

            const id = req.userId;
            const reservation = await this.service.getAllByAdmin(id)
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: reservation
            });

        } catch (error) {
            next(error)
        }
    }

    async getAllBySuperAdmin(req: Request, res: Response, next: NextFunction) {
        try {


            const reservation = await this.service.getAllBySuperAdmin()
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: reservation
            });

        } catch (error) {
            next(error)
        }
    }

    async getAllBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            const reservation = await this.service.getAllByUserId(id)
            res.status(200).json({
                success: true,
                message: "Sucess",
                data: reservation
            });

        } catch (error) {
            next(error)
        }
    }

}

export const reservationController = new ReservationController()