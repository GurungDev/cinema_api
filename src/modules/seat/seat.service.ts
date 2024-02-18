import { DeepPartial } from "typeorm";
import SeatEntity from "./entities/seat.entity";
import { SeatRepo, seatRepo } from "./repo/seat.repo";
 

export class HallService {
    protected readonly repository: SeatRepo;
    constructor() {
        this.repository = seatRepo
    }
    async getById(id: number) {
        return this.repository.findBy({ id })
    }

    async getAllByHallId(hallId: number) {
        return this.repository.findBy({ hall: {id: hallId} })
    }

    async createOne(hall: DeepPartial<SeatEntity>) {
        return this.repository.create(hall);
    }

    async delete(hallId: number) {
        return this.repository.delete({ id: hallId });
    }

    async update(seatId: number, seat: DeepPartial<SeatEntity>) {
        return this.repository.update({ id: seatId }, seat);
    }
}