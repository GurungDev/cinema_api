import { DeepPartial } from "typeorm";
import ShowEntity from "./entities/show.entity";
import { ShowRepo, showRepo } from "./repo/show.repo";
import { ShowTime } from "../../common/enum";

export class ShowService {
    protected readonly repository: ShowRepo;
    constructor() {
        this.repository = showRepo
    }
    async getById(id: number) {
        return await this.repository.findBy({ id })
    }

    async getAllByCinemaId(cinemaId: number) {
        return await this.repository.findBy({ cinema: { id: cinemaId } })
    }

    async getAllByMovieId(movieID: number) {
        return await this.repository.find({ where: { movie: { id: movieID } }, relations: { cinema: true, hall: true, movie: true } })
    }

    async getMovie(hallId: number, movieId: number, date: string, show_time: ShowTime) {
        return await this.repository.findOneBy(
            {
                movie: { id: movieId },
                hall: { id: hallId },
                date: date,
                start_time: show_time
            }
        )
    }

    async createOne(show: DeepPartial<ShowEntity>) {
        return this.repository.create(show);
    }

    async createMany(shows: DeepPartial<ShowEntity>[]) {
        const entities = shows.map(seat => this.repository.create(seat));
        return await this.repository.save(entities);

    }

    async delete(showId: number) {
        return await this.repository.delete({ id: showId });
    }

    async update(showId: number, show: DeepPartial<ShowEntity>) {
        return await this.repository.update({ id: showId }, show);
    }
}

export const showService = new ShowService()