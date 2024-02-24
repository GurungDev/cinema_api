import 'dotenv/config';
import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export let typeormConfig: any = {
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   synchronize: true,
   logging: false,
   entities: [join(__dirname, "**", "entities", "*.entity.{js,ts}")],
   migrations: [join(__dirname, "migration", "*.migration.{js,ts}")],
   subscribers: [join(__dirname, "modules", "**", "*.subscriber.{js,ts}")],
   cli: {
     entitiesDir: "src/entities",
     migrationsDir: "src/migration",
     subscribersDir: "src/subscriber",
   },
}
export const AppDataSource = new DataSource(typeormConfig)