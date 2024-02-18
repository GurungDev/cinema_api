 
import cinema from './app';
import { AppDataSource } from './data-source';
 
const app = cinema();

app.listen(process.env.PORT, async () => {
  console.log(
    `Server is running on port ${process.env.PORT}. `
  );
  await AppDataSource.initialize();
  console.log(`DB is connected in port  ${process.env.DB_PORT}` );
});
 