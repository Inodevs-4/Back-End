import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Cliente } from "../entities/Cliente"

export default class ClienteController {

    async salvarCliente(req: Request, res: Response) {
        const { cnpj, nome, contato } = req.body

        try {
            const novoCliente = AppDataSource.manager.create(Cliente, { cnpj, nome, contato})
            await AppDataSource.manager.save(Cliente, novoCliente)

            return res.json(novoCliente)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async todosClientes(req: Request, res: Response){
        try {
            const clientes = await AppDataSource.manager.find(Cliente, {
                relations: {
                    projetos: true,
                },
                order: {
                    nome: "ASC"
                }
            })
            return res.json(clientes)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }  
    }

    async getCliente(req: Request, res: Response){
        const { cnpj } = req.params

        try {
            const clientes = await AppDataSource.manager.find(Cliente, {
                relations: {
                    projetos: true,
                },
                where: { cnpj },
            })

            return res.json(clientes[0])
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
       
    }

    async atualizarCliente(req: Request, res: Response) {
        const { cnpj } = req.params
        const { nome, contato } = req.body
        
        try {
            const novoCliente = AppDataSource.manager.create(Cliente,{ cnpj, nome, contato})
            await AppDataSource.manager.save(Cliente, novoCliente)

            return res.json(novoCliente)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async excluirCliente(req: Request, res: Response) {
        const { cnpj } = req.params

        try {
            const cliente = await AppDataSource.manager.findOneBy(Cliente, { cnpj })
            await AppDataSource.manager.delete(Cliente, cliente)

            return res.json(cliente)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }   

}