import { EntityManager, Repository } from "typeorm";
 
import { AppDataSource } from "../../../data-source";
import SeatEntity from "../entities/seat.entity";
 

export class SeatRepo extends Repository<SeatEntity>{}

export const seatRepo = new SeatRepo(
  SeatEntity,
  new EntityManager(AppDataSource)
);
