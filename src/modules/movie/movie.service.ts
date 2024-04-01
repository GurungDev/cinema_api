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

    async getMovieAccordingToCinemaId(cinemaId: number) {
        return await this.repository.findBy({ cinema: { id: cinemaId } });
    }

    async getMovieCountAccordingToCinemaId(cinemaId: number) {
        return await this.repository.countBy({ cinema: { id: cinemaId } });
    }

    async getMovieAccordingToId(id: number) {
        return await this.repository.findOne({ where: { id: id }, relations: { cinema: true } });
    }

    async createOne(movie: DeepPartial<MovieEntity>) {
        return this.repository.create(movie).save();
    }

    async delete(movieId: number, cinemaId: number) {
        // Check if the movie has any associated shows
        const movie = await this.repository.findOne({ where: { id: movieId }, relations: { shows: true } });

        if (!movie || movie.shows.length > 0) {
            // Movie not found or has associated shows, do not delete
            throw new ExpressError(400, "Movie cannot be deleted as it has associated shows.");
        }

        return this.repository.softDelete({ id: movieId, cinema: { id: cinemaId } });
    }

    async update(movieId: number, movie: DeepPartial<MovieEntity>) {
        return this.repository.update({ id: movieId }, movie);
    }
}

export const movieService = new MovieService();