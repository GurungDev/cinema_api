import { EntityManager, Repository } from "typeorm";
 
import { AppDataSource } from "../../../data-source";
import ReservationEntity from "../entities/reservation.entity";

export class ReservationRepo extends Repository<ReservationEntity>{}

export const reservationRepo = new ReservationRepo(
  ReservationEntity,
  new EntityManager(AppDataSource)
);
