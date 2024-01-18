 
import pokharaRental from './app';
import { AppDataSource } from './data-source';
 
const app = pokharaRental();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(
    `Server is running on port ${PORT}. `
  );
  await AppDataSource.initialize();
  console.log(`DB is connected in port  ${process.env.DB_PORT}` );
});
 