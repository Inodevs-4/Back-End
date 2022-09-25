import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { Projeto } from "../entities/Projeto"
import { CR } from "../entities/CR"

export class ProjetoSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const projetoRepository = dataSource.getRepository(Projeto)
        const CRRepository = dataSource.getRepository(CR)

        const squad = await CRRepository.findOneBy({ nome: "Squad 1" })
        const tribo = await CRRepository.findOneBy({ nome: "Tribo 1"})
        const departamento =  await CRRepository.findOneBy({ nome: "Departamento 1" })


        const projeto1 = {
            nome: "Projeto 1",
            cr: squad
        }   

		const projeto1Exists = await projetoRepository.findOneBy({ nome: projeto1.nome })

		if (!projeto1Exists) {
            const novoProjeto1 = projetoRepository.create(projeto1)
            await projetoRepository.save(novoProjeto1)
		}
       
        const projeto2 = {
            nome: "Projeto 2",
            cr: tribo
        }   

		const projeto2Exists = await projetoRepository.findOneBy({ nome: projeto2.nome })

		if (!projeto2Exists) {
            const novoProjeto2 = projetoRepository.create(projeto2)
            await projetoRepository.save(novoProjeto2)
		}
        const projeto3 = {
            nome: "Projeto 3",
            cr: departamento
        }   

		const projeto3Exists = await projetoRepository.findOneBy({ nome: projeto3.nome })

		if (!projeto3Exists) {
            const novoProjeto3 = projetoRepository.create(projeto3)
            await projetoRepository.save(novoProjeto3)
		}
       
        
    }

}