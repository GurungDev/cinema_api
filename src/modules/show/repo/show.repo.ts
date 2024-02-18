import { EntityManager, Repository } from "typeorm";
 
import { AppDataSource } from "../../../data-source";
import ShowEntity from "../entities/show.entity";
 
 

export class ShowRepo extends Repository<ShowEntity>{}

export const showRepo = new ShowRepo(
  ShowEntity,
  new EntityManager(AppDataSource)
);
