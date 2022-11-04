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
            id: 1,
            nome: "Projeto 1",
            cr: squad
        }   

		const projeto1Exists = await projetoRepository.findOneBy({ id: projeto1.id })

		if (!projeto1Exists) {
            console.log('entrou!')
            const novoProjeto1 = projetoRepository.create(projeto1)
            await projetoRepository.save(novoProjeto1)
		}
       
        const projeto2 = {
            id: 2,
            nome: "Projeto 2",
            cr: tribo
        }   

		const projeto2Exists = await projetoRepository.findOneBy({ id: projeto2.id })

		if (!projeto2Exists) {
            console.log('entrou!')
            const novoProjeto2 = projetoRepository.create(projeto2)
            await projetoRepository.save(novoProjeto2)
		}
        const projeto3 = {
            id: 3,
            nome: "Projeto 3",
            cr: departamento
        }   

		const projeto3Exists = await projetoRepository.findOneBy({ id: projeto3.id })

		if (!projeto3Exists) {
            console.log('entrou!')
            const novoProjeto3 = projetoRepository.create(projeto3)
            await projetoRepository.save(novoProjeto3)
		}
       
        
    }

}