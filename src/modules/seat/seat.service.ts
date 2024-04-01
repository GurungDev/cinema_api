import { DeepPartial } from "typeorm";
import SeatEntity from "./entities/seat.entity";
import { SeatRepo, seatRepo } from "./repo/seat.repo";


export class SeatService {
    protected readonly repository: SeatRepo;
    constructor() {
        this.repository = seatRepo
    }
    async getById(id: number) {
        return this.repository.findBy({ id })
    }

    async getAllByHallId(hallId: number) {
        return this.repository.findBy({ hall: { id: hallId } })
    }

    async deleteAllByHallId(hallId: number) {
        return this.repository.softDelete({ hall: { id: hallId } })
    }


    async createOne(seatID: DeepPartial<SeatEntity>) {
        return this.repository.create(seatID).save();
    }

    async createMany(seats: DeepPartial<SeatEntity>[]) {
        console.log(seats)
        const entities = seats.map(seat => (console.log(seat), this.repository.create(seat)));
        return this.repository.save(entities);
    }

    async delete(seatIDId: number) {
        return this.repository.delete({ id: seatIDId });
    }

    async update(seatId: number, seat: DeepPartial<SeatEntity>) {
        return this.repository.update({ id: seatId }, seat);
    }
}

export const seatService = new SeatService()