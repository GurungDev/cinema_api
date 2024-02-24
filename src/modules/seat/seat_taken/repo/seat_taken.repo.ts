import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import SeatTakenEntity from "../entities/seat_taken.entity";

export class SeatRepo extends Repository<SeatTakenEntity>{ }

export const seatRepo = new SeatRepo(
    SeatTakenEntity,
    new EntityManager(AppDataSource)
);
