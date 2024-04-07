import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import SeatTakenEntity from "../entities/seat_taken.entity";

export class SeatTakenRepo extends Repository<SeatTakenEntity>{ }

export const seatTakenRepo = new SeatTakenRepo(
    SeatTakenEntity,
    new EntityManager(AppDataSource)
);
