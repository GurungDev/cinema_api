import { DeepPartial } from "typeorm";

import CinemaEntity from "./entities/cinema.entity";
import { plainToInstance } from "class-transformer";
import { CinemaRepo, cinemaRepo } from "./repository/cinema.repository";
import { CinemaSerializer } from "./cinema.serializer";
import { ExpressError } from "../../../common/class/error";


export class CinemaService {
  protected readonly repository: CinemaRepo;
  constructor() {
    this.repository = cinemaRepo;
  }

  async findBYId(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
  }

  async changePassword(email: string, newPassword: string) {
    const cinema = await this.repository.findOne({ where: { email } });
    if (!cinema) {
      throw new Error('cinema not found');
    }

    await cinema.setPassword(newPassword);
    return await cinema.save();
  }
 
  async deleteCinema(storeId: number) {
    return await this.repository.softDelete({ id: storeId });
  }

  async getAllCinema() {
    return await this.repository.find({order: {createdAt: "desc"}});
  }

  async getCinemaCount() {
    return await this.repository.count();
  }


  async createOne(data: DeepPartial<CinemaEntity>) {
    const newCinema = this.repository.create({
      name: data.name,
      email: data.email,
      address: data.address
    });
    if (data?.password) {
      await newCinema.setPassword(data?.password);
    }
    return await newCinema.save();
  }

 

}

export const cinemaService = new CinemaService();
