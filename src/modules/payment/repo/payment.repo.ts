import { EntityManager, Repository } from "typeorm";
 
import { AppDataSource } from "../../../data-source";
import PaymentEntity from "../entities/payment.entity";
 
 

export class PaymentRepo extends Repository<PaymentEntity>{}

export const paymentRepo = new PaymentRepo(
  PaymentEntity,
  new EntityManager(AppDataSource)
);
