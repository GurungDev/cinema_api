import { MovieRepo, movieRepo } from "./repository/movie.repository";

 
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
}

export const movieService = new MovieService();