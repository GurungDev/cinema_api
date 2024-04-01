import { DeepPartial } from "typeorm";
import { HallRepo, hallRepo } from "./repository/hall.repo";
import HallEntity from "./entities/hall.entity";
import { ExpressError } from "../../common/class/error";

export class HallService {
    protected readonly repository: HallRepo;
    constructor() {
        this.repository = hallRepo
    }
    async getById(id: number) {
        return this.repository.findOne({ where: { id }, relations: { seats: true, cinema: true } })
    }

    async getAllByCinemaId(cinemaId: number) {
        return this.repository.findBy({ cinema: { id: cinemaId } })
    }

    async createOne(hall: DeepPartial<HallEntity>) {
        return this.repository.create(hall).save();
    }

    async delete(hallId: number, cinemaId: number) {
        // Check if the movie has any associated shows
        const movie = await this.repository.findOne({ where: { id: hallId }, relations: { shows: true } });

        if (!movie || movie.shows.length > 0) {
            // Movie not found or has associated shows, do not delete
            throw new ExpressError(400, "Hall cannot be deleted as it has associated shows.");
        }
        return this.repository.softDelete({ id: hallId, cinema: { id: cinemaId } });
    }

    async update(hallId: number, hall: DeepPartial<HallEntity>) {
        return this.repository.update({ id: hallId }, hall);
    }
}

export const hallService = new HallService()