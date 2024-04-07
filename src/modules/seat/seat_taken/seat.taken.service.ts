import { DeepPartial } from "typeorm";
import { SeatTakenRepo, seatTakenRepo } from "./repo/seat_taken.repo";
import SeatTakenEntity from "./entities/seat_taken.entity";

export class SeatTakenService {
    private readonly repo: SeatTakenRepo;
    constructor() {
        this.repo = seatTakenRepo
    }


    async createMany(seats: DeepPartial<SeatTakenEntity>[]) {
        const entities = seats.map(seat => (this.repo.create(seat)));
        return this.repo.save(entities);
    }

    async delete(seatIDId: number) {
        return this.repo.delete({ id: seatIDId });
    }

    async update(seatId: number, seat: DeepPartial<SeatTakenEntity>) {
        return this.repo.update({ id: seatId }, seat);
    }

    async getById(id: number) {
        return this.repo.findBy({ id })
    }

    async getAllByReservationId(reservationId: number) {
        return this.repo.findBy({ reservation: { id: reservationId } })
    }

    async getAllByShowId(showId: number) {
        return this.repo.find({ where: { reservation: { show: { id: showId } } }, relations: { seat: true, reservation: { show: true } }, select: { seat: { id: true, seat_no: true }, reservation: { status: true, id: true, show: { id: true } } } })
    }

    async deleteAllByReservationId(reservationId: number) {
        return this.repo.softDelete({ reservation: { id: reservationId } })
    }

}