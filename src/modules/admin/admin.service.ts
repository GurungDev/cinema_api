 
import { AdminRepository, adminRepository } from "./repository/admin.repository";

 

export class AdminService {
  protected readonly repository: AdminRepository;
  constructor() {
    this.repository = adminRepository;
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }
 
}

export const adminService = new AdminService();
