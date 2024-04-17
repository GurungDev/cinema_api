import { DeepPartial } from "typeorm";
import { PaymentRepo, paymentRepo } from "./repo/payment.repo";
import PaymentEntity from "./entities/payment.entity";

export class PaymentService {
    protected readonly repository: PaymentRepo;
    constructor() {
        this.repository = paymentRepo
    }
    async getById(id: number) {
        return this.repository.findBy({ id })
    }
    
    async createOne(payment: DeepPartial<PaymentEntity>) {
        return this.repository.create(payment);
    }

    async update(paymentId: number, payment: DeepPartial<PaymentEntity>) {
        return this.repository.update({ id: paymentId }, payment);
    }
}