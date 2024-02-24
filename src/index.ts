 
import cinema from './app';
import { AppDataSource } from './data-source';
import { AdminSeeder } from './modules/admin/seeder/admin.seeder';
 
const app = cinema();

app.listen(8080, async () => {
  console.log(
    `Server is running on port 8080. `
  );
  await AppDataSource.initialize();
  await AdminSeeder()
  console.log(`DB is connected in port  ${process.env.DB_PORT}` );
});
 