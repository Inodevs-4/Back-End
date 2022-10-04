import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import * as bcrypt from "bcrypt"
import { Colaborador, Perfil } from "../entities/Colaborador"
import { CR } from "../entities/CR"

export class ColaboradorSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const colaboradorRepository = dataSource.getRepository(Colaborador)
        const CRRepository = dataSource.getRepository(CR)

        const squad = await CRRepository.findOneBy({ nome: "Squad 1" })
        const departamento =  await CRRepository.findOneBy({ nome: "Departamento 1" })

        const perfColaborador: Perfil = 'colaborador'
        const perfGestor: Perfil = 'gestor'
        const perfAdministrador: Perfil = 'administrador'

        const inodevs = {
            matricula: 2022,
            nome: "Inodevs",
            turno: "Manhã",
            email: "api@inodevs.com",
            telefone: "(12)99999-2022",
            perfil: perfAdministrador,
            senha: await bcrypt.hash('123', 10),
            cr: squad
        }   

		const inodevsExists = await colaboradorRepository.findOneBy({ email: inodevs.email })

		if (!inodevsExists) {
            const newInodevs = colaboradorRepository.create(inodevs)
            await colaboradorRepository.save(newInodevs)
		}

        const administrador = {
            matricula: 10000,
            nome: "Administrador",
            turno: "Madrugada",
            email: "adm@mail.com",
            telefone: "(12)99999-9990",
            perfil: perfAdministrador,
            senha: await bcrypt.hash('123', 10),
            cr: squad
        }   

		const administradorExists = await colaboradorRepository.findOneBy({ email: administrador.email })

		if (!administradorExists) {
            const novoAdministrador = colaboradorRepository.create(administrador)
            await colaboradorRepository.save(novoAdministrador)
		}

        const colaborador1 = {
            nome: "Colaborador 1",
            matricula: 12345,
            turno: "Tarde",
            email: "colaborador1@mail.com",
            telefone: "(12)99999-9999",
            perfil: perfColaborador,
            senha: await bcrypt.hash('123', 10),
            cr: squad
        }   

		const colaborador1Exists = await colaboradorRepository.findOneBy({ email: colaborador1.email })

		if (!colaborador1Exists) {
            const novoColaborador1 = colaboradorRepository.create(colaborador1)
            await colaboradorRepository.save(novoColaborador1)
		}

        const colaborador2 = {
            nome: "Colaborador 2",
            matricula: 12346,
            turno: "Noite",
            email: "colaborador2@mail.com",
            telefone: "(12)99999-9998",
            perfil: perfColaborador,
            senha: await bcrypt.hash('123', 10),
            cr: departamento
        }   

		const colaborador2Exists = await colaboradorRepository.findOneBy({ email: colaborador2.email })

		if (!colaborador2Exists) {
            const novoColaborador2 = colaboradorRepository.create(colaborador2)
            await colaboradorRepository.save(novoColaborador2)
		}

        const gestor1 = {
            nome: "Gestor 1",
            matricula: 12347,
            turno: "Tarde",
            email: "gestor1@mail.com",
            telefone: "(12)99999-9997",
            perfil: perfGestor,
            senha: await bcrypt.hash('123', 10),
            cr: squad
        }   

		const gestor1Exists = await colaboradorRepository.findOneBy({ email: gestor1.email })

		if (!gestor1Exists ) {
            const novoGestor1= colaboradorRepository.create(gestor1)
            await colaboradorRepository.save(novoGestor1)
		}

        const gestor2  = {
            nome: "Gestor 2",
            matricula: 12348,
            turno: "Noite",
            email: "gestor2@mail.com",
            telefone: "(12)99999-9996",
            perfil: perfGestor,
            senha: await bcrypt.hash('123', 10),
            cr: departamento
        }   

		const gestor2Exists = await colaboradorRepository.findOneBy({ email: gestor2.email })

		if (!gestor2Exists) {
            const novoColaborador = colaboradorRepository.create(gestor2)
            await colaboradorRepository.save(novoColaborador)
		}
        
    }

}