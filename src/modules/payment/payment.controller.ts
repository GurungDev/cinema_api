import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { SeatStatus } from "../../common/enum";
import { IdDto } from "../../common/validation/idValidation";
import { ReservationService } from "../reservation/reservation.service";
import SeatTakenEntity from "../seat/seat_taken/entities/seat_taken.entity";
import { SeatTakenService } from "../seat/seat_taken/seat.taken.service";
import { PaymentDto } from "./payment.dto";
import { PaymentService } from "./payment.service";



export class PaymentController {
    private readonly service: PaymentService;
    private readonly reservationService: ReservationService;
    private readonly seatService: SeatTakenService;
    constructor() {
        this.service = new PaymentService();
        this.reservationService = new ReservationService();
        this.seatService = new SeatTakenService();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params)
            const userId = req.userId;
            //create payment
            const { seats, pidx, amountInRs } = plainToInstance(PaymentDto, req.body)
       
            const newPayment = await this.service.createOne({ amountInRs, customer: { id: userId }, paymentId: pidx })

            const reservation = await this.reservationService.createOne({ show: { id: id }, customer: { id: userId }, status: SeatStatus.BOOKED, payment: { id: newPayment.id } })
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



}

export const paymentController = new PaymentController()