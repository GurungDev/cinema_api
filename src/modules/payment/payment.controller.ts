import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { ReservationService } from "../reservation/reservation.service";
import { IdDto } from "../../common/validation/idValidation";
import { ResevationDto } from "../reservation/reservation.dto";
import SeatTakenEntity from "../seat/seat_taken/entities/seat_taken.entity";
import { SeatTakenService } from "../seat/seat_taken/seat.taken.service";
import { SeatStatus } from "../../common/enum";
import { PaymentDto } from "./payment.dto";
import axios from "axios";



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
            let data = {
                pidx: pidx,
            };

            let config = {
                headers: { Authorization: `key bf5cc78f95314623b8f12005435b87bd` },
            };

            const response: any = await axios.post(
                "https://a.khalti.com/api/v2/epayment/lookup/",
                data,
                config
            );
            if (response?.data.status != "Completed") {
                throw new Error(response.data.status);
            }
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