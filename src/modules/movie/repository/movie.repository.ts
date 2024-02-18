import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import MovieEntity from "../entities/movie.entity";
  
export class MovieRepo extends Repository<MovieEntity>{}

export const movieRepo = new MovieRepo(
  MovieEntity,
  new EntityManager(AppDataSource)
);
