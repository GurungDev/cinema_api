import { DeepPartial } from "typeorm";
import { HallRepo, hallRepo } from "./repository/hall.repo";
import HallEntity from "./entities/hall.entity";

export class HallService {
    protected readonly repository: HallRepo;
    constructor() {
        this.repository = hallRepo
    }
    async getById(id: number) {
        return this.repository.findBy({ id })
    }

    async getAllByCinemaId(cinemaId: number) {
        return this.repository.findBy({ cinema: {id: cinemaId} })
    }

    async createOne(hall: DeepPartial<HallEntity>) {
        return this.repository.create(hall);
    }

    async delete(hallId: number) {
        return this.repository.delete({ id: hallId });
    }

    async update(hallId: number, hall: DeepPartial<HallEntity>) {
        return this.repository.update({ id: hallId }, hall);
    }
}