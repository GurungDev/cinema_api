import { generateHash } from "../../../common/function/hashing";
import { AppDataSource } from "../../../data-source";
import AdminEntity from "../entities/admin.entity";

 
export async function AdminSeeder(){
    try {
    const {hashedValue, salt}= await generateHash("password");
    const existingAdmin = await AppDataSource.getRepository(AdminEntity).findOne({
      where: {email: "admin@email.com"}
    })

    if(!existingAdmin){
        await AppDataSource.getRepository(AdminEntity).create({email:"admin@email.com", password: hashedValue, salt: salt}).save();
        return console.log("Admin seeded");
    }
    console.log("Admin already seeded");
    } catch (error) {
        console.log("Error While seeding admin.")
    }
}