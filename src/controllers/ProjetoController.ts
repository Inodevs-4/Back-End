import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Projeto } from "../entities/Projeto"

export default class ProjetoController {

    async selectProjetos(req: Request, res: Response) {
        try {
            const projetos = await AppDataSource.manager.find(Projeto, {
                order: {
                    nome: "ASC"
                }
            })
            return res.json(projetos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }  

    async todosProjetos(req: Request, res: Response) {
        try {
            const projetos = await AppDataSource.manager.find(Projeto, {
                relations: {
                    lancamentos: true,
                    cliente: true,
                    cr: true
                },
                order: {
                    id: "DESC"
                }
            })
            return res.json(projetos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }  
    
    async salvarProjeto(req: Request, res: Response) {
        const { nome, cliente, cr } = req.body

        try {
            const novoProjeto = AppDataSource.manager.create(Projeto, { nome, cliente, cr })
            await AppDataSource.manager.save(Projeto, novoProjeto)

            return res.json(novoProjeto)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async getProjeto(req: Request, res: Response){
        const { id } = req.params

        try {
            const projetos = await AppDataSource.manager.find(Projeto, {
                relations: {
                    lancamentos: true,
                    cliente: true,
                    cr: true
                },
                where: { id: Number(id) },
            })

            return res.json(projetos[0])
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
       
    }

    async atualizarProjeto(req: Request, res: Response) {
        const { id } = req.params
        const { nome, cliente, cr } = req.body
        
        try {
            const novoProjeto = AppDataSource.manager.create(Projeto,{ id: Number(id), nome, cliente, cr })
            await AppDataSource.manager.save(Projeto, novoProjeto)

            return res.json(novoProjeto)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async excluirProjeto(req: Request, res: Response) {
        const { id } = req.params

        try {
            const projeto = await AppDataSource.manager.findOneBy(Projeto, { id: Number(id) })
            await AppDataSource.manager.delete(Projeto, projeto)

            return res.json(projeto)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }  

}
