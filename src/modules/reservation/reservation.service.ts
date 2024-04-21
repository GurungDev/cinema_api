import { DeepPartial, MoreThan, MoreThanOrEqual } from "typeorm";

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
        return this.repository.find({ where: { show: { id } }, relations: { customer: true, seats: true, show: true, payment: true } })
    }

    async getAllByUserId(userId: number) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to the start of the day
        const todayString = today.toISOString();
        return this.repository.find({ where: { customer: { id: userId }, show: { date: MoreThanOrEqual(todayString) } }, order: { createdAt: "DESC" }, relations: { customer: true, seats: { seat: true }, show: { reservations: true, hall: true, movie: true, cinema: true }, payment: true } })
    }

    async getAllByAdmin(userId: number) {
        return this.repository.find({
            where: { show: { hall: { cinema: { id: userId } } } }, relations: { customer: true, seats: { seat: true }, show: { hall: { cinema: true } }, payment: true }
        })
    }

    async getAllBySuperAdmin() {
        return this.repository.find({
            where: { show: { isActive: true } }, relations: { customer: true, seats: { seat: true }, show: { hall: { cinema: true } }, payment: true }
        })
    }

    async createOne(reservation: DeepPartial<ReservationEntity>) {
        return this.repository.create(reservation).save();
    }

    async update(reservationId: number, reservation: DeepPartial<ReservationEntity>) {
        return this.repository.update({ id: reservationId }, reservation);
    }
}