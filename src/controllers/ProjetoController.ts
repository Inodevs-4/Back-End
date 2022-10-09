import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Projeto } from "../entities/Projeto"

export default class ProjetoController {

    async selectProjetos(req: Request, res: Response) {
        try {
            const projetos = await AppDataSource.manager.find(Projeto, {
                relations: {
                    lancamentos: true,
                    cliente: true,
                    cr: true
                },
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

}
