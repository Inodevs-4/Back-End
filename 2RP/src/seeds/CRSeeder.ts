import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { CR } from "../entities/CR"

export class CRSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const CRRepository = dataSource.getRepository(CR)

        const squad = {
            nome: "Squad 1",
            numero: 123
        }   

		const squadExists = await CRRepository.findOneBy({ nome: squad.nome })

		if (!squadExists) {
            const novoSquad = CRRepository.create(squad)
            await CRRepository.save(novoSquad)
		}
       
        const tribo = {
            nome: "Tribo 1",
            numero: 234
        }   

		const triboExists = await CRRepository.findOneBy({ nome: tribo.nome})

		if (!triboExists) {
            const novaTribo = CRRepository.create(tribo)
            await CRRepository.save(novaTribo)
		}
        const departamento = {
            nome: "Departamento 1",
            numero: 345
        }   

		const departamentoExists = await CRRepository.findOneBy({ nome: departamento.nome })

		if (!departamentoExists) {
            const novoDepartamento = CRRepository.create(departamento)
            await CRRepository.save(novoDepartamento)
		}
        
    }

}