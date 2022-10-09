import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { ColaboradorSeeder } from "./ColaboradorSeeder";
import { CRSeeder } from "./CRSeeder";
import { ProjetoSeeder } from "./ProjetoSeeder";

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await runSeeder(dataSource, CRSeeder)
        await runSeeder(dataSource, ColaboradorSeeder)
        await runSeeder(dataSource, ProjetoSeeder)
    }
}