import { EntityManager, Repository } from "typeorm";
import HallEntity from "../entities/hall.entity";
import { AppDataSource } from "../../../data-source";
 
 

export class HallRepo extends Repository<HallEntity>{}

export const hallRepo = new HallRepo(
  HallEntity,
  new EntityManager(AppDataSource)
);
