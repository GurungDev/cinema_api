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
        return await this.repository.findOne({ where: { id: id, isActive: true }, relations: { cinema: true, hall: true, movie: true } })
    }

    async getAllByCinemaId(cinemaId: number) {
        return await this.repository.find({ where: { cinema: { id: cinemaId }, isActive: true }, relations: { movie: true, hall: true }, order: { createdAt: "DESC" } })
    }

    async getAllByMovieId(movieID: number) {
        return await this.repository.find({ where: { movie: { id: movieID }, isActive: true }, relations: { cinema: true, hall: true, movie: true } })
    }

    async getTopMovies() {
        const topMovies = await this.repository.createQueryBuilder('show')
          .select('movie.title', 'movieName')
          .addSelect('movie.image', 'image')
          .addSelect('COUNT(*)', 'count')
          .leftJoin('show.movie', 'movie')
          .where('show.isActive = :isActive', { isActive: true })
          .andWhere('EXTRACT(MONTH FROM show.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE)')
          .andWhere('EXTRACT(YEAR FROM show.createdAt) = EXTRACT(YEAR FROM CURRENT_DATE)')
          .groupBy('show.movie.id')
          .addGroupBy('movie.title')
          .addGroupBy('movie.image')
          .orderBy('count', 'DESC')
          .limit(5)
          .getRawMany();
      
        return topMovies;
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



    async update(showId: number, show: DeepPartial<ShowEntity>) {
        return await this.repository.update({ id: showId }, show);
    }
}

export const showService = new ShowService()