import { DeepPartial } from "typeorm";
import { HallRepo, hallRepo } from "./repository/hall.repo";
import HallEntity from "./entities/hall.entity";

export class HallService {
    protected readonly repository: HallRepo;
    constructor() {
        this.repository = hallRepo
    }
    async getById(id: number) {
        return this.repository.findOneBy({ id })
    }

    async getAllByCinemaId(cinemaId: number) {
        return this.repository.findBy({ cinema: {id: cinemaId} })
    }

    async createOne(hall: DeepPartial<HallEntity>) {
        return this.repository.create(hall).save();
    }

    async delete(hallId: number, cinemaId: number) {
        return this.repository.softDelete({ id: hallId , cinema: {id: cinemaId}});
    }

    async update(hallId: number, hall: DeepPartial<HallEntity>) {
        return this.repository.update({ id: hallId }, hall);
    }
}

export const hallService = new HallService()