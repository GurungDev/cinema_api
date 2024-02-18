import { DeepPartial } from "typeorm";
import ShowEntity from "./entities/show.entity";
import { ShowRepo, showRepo } from "./repo/show.repo";
 
export class ShowService {
    protected readonly repository: ShowRepo;
    constructor() {
        this.repository = showRepo
    }
    async getById(id: number) {
        return this.repository.findBy({ id })
    }

    async getAllByCinemaId(cinemaId: number) {
        return this.repository.findBy({ cinema: {id: cinemaId} })
    }

    async createOne(show: DeepPartial<ShowEntity>) {
        return this.repository.create(show);
    }

    async delete(showId: number) {
        return this.repository.delete({ id: showId });
    }

    async update(showId: number, show: DeepPartial<ShowEntity>) {
        return this.repository.update({ id: showId }, show);
    }
}