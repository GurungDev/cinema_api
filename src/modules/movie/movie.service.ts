import { DeepPartial } from "typeorm";
import { MovieRepo, movieRepo } from "./repository/movie.repository";
import MovieEntity from "./entities/movie.entity";
import { ExpressError } from "../../common/class/error";


export default class MovieService {
    protected readonly repository: MovieRepo;
    constructor() {
        this.repository = movieRepo;
    }

    async getAll() {
        const movie = await this.repository.find();
        return movie;
    }

    async getMovieAccordingToCinemaId() {
        return await this.repository.find();
    }

    async getMovieCountAccordingToCinemaId() {
        return await this.repository.countBy({});
    }

    async getMovieAccordingToId(id: number) {
        return await this.repository.findOne({ where: { id: id } });
    }

    async createOne(movie: DeepPartial<MovieEntity>) {
        return this.repository.create(movie).save();
    }

    async delete(movieId: number) {
        // Check if the movie has any associated shows
        const movie = await this.repository.findOne({ where: { id: movieId }, relations: { shows: true } });

        return this.repository.softDelete({ id: movieId });
    }

    async update(movieId: number, movie: DeepPartial<MovieEntity>) {
        return this.repository.update({ id: movieId }, movie);
    }
}

export const movieService = new MovieService();