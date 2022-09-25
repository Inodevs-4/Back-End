import { DataSource, DataSourceOptions } from "typeorm"
import 'dotenv/config'
import { SeederOptions } from "typeorm-extension"
import { MainSeeder } from "./seeds/MainSeeder"

const options: DataSourceOptions & SeederOptions = {
    url: process.env.DATABASE_URL,
    type: "postgres",
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
	seeds: [MainSeeder]
}

export const AppDataSource = new DataSource(options)

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    })