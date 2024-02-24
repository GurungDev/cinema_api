import { DeepPartial } from "typeorm";
import { MovieRepo, movieRepo } from "./repository/movie.repository";
import MovieEntity from "./entities/movie.entity";

 
export default class MovieService{
    protected readonly repository: MovieRepo;
    constructor(){
        this.repository = movieRepo;
    }

    async getAll(){
        const movie = await this.repository.find();
        return movie;
    }

    async getMovieAccordingToCinemaId(cinemaId: number){
        return await this.repository.findBy({ cinema: {id: cinemaId} });
    }

    async getMovieCountAccordingToCinemaId(cinemaId: number){
        return await this.repository.countBy({ cinema: {id: cinemaId} });
    }

    async getMovieAccordingToId(id:number){
        return await this.repository.findOneBy({ id: id });
    }    

    async createOne(movie: DeepPartial<MovieEntity>) {
        return this.repository.create(movie).save();
    }

    async delete(movieId: number, cinemaId: number) {
        return this.repository.softDelete({ id: movieId , cinema: {id: cinemaId}});
    }

    async update(movieId: number, movie: DeepPartial<MovieEntity>) {
        return this.repository.update({ id: movieId },movie);
    }
}

export const movieService = new MovieService();