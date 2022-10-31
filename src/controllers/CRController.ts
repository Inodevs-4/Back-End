import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { CR } from "../entities/CR"

export default class CRController {

    async salvarCR(req: Request, res: Response) {
        const { numero, nome, colaboradores } = req.body

        try {
            const novoCR = AppDataSource.manager.create(CR, { numero, nome, colaboradores })
            await AppDataSource.manager.save(CR, novoCR)

            return res.json(novoCR)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async todosCRs(req: Request, res: Response){
        try {
            const crs = await AppDataSource.manager.find(CR, {
                relations: {
                    colaboradores: true,
                },
                order: {
                    nome: "ASC"
                }
            })
            return res.json(crs)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }  
    }

    async getCR(req: Request, res: Response){
        const { numero } = req.params

        try {
            const crs = await AppDataSource.manager.find(CR, {
                relations: {
                    colaboradores: true,
                },
                where: { numero: Number(numero) },
            })

            return res.json(crs[0])
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
       
    }

    async atualizarCR(req: Request, res: Response) {
        const { numero } = req.params
        const { nome } = req.body
        
        try {
            const novoCR = AppDataSource.manager.create(CR,{ numero: Number(numero), nome })
            await AppDataSource.manager.save(CR, novoCR)

            return res.json(novoCR)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async excluirCR(req: Request, res: Response) {
        const { numero } = req.params

        try {
            const cr= await AppDataSource.manager.findOneBy(CR, { numero: Number(numero) })
            await AppDataSource.manager.delete(CR, cr)

            return res.json(cr)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }   

}