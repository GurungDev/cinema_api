import { EntityManager, Repository } from "typeorm";
 
import { AppDataSource } from "../../../../data-source";
import CinemaEntity from "../entities/cinema.entity";

export class CinemaRepo extends Repository<CinemaEntity>{}

export const cinemaRepo = new CinemaRepo(
  CinemaEntity,
  new EntityManager(AppDataSource)
);
