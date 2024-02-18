import { DeepPartial } from "typeorm";
 
import { ReservationRepo, reservationRepo } from "./repo/reservation.repo";
import ReservationEntity from "./entities/reservation.entity";

export class ReservationService {
    protected readonly repository: ReservationRepo;
    constructor() {
        this.repository = reservationRepo
    }
    async getById(id: number) {
        return this.repository.findBy({ id })
    }

    async getAllReservationByShowId(id: number) {
        return this.repository.findBy({ show: {id} })
    }

    async getAllByUserId(userId: number) {
        return this.repository.findBy({ customer: {id: userId} })
    }

    async createOne(reservation: DeepPartial<ReservationEntity>) {
        return this.repository.create(reservation);
    }

    async update(reservationId: number, reservation: DeepPartial<ReservationEntity>) {
        return this.repository.update({ id: reservationId }, reservation);
    }
}