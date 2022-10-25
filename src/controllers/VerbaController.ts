import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Verba } from "../entities/Verba"

export default class CRController {

    async salvarVerba(req: Request, res: Response) {
        const { numero, adicional, quantidadehoras, inicio, fim } = req.body

        try {
            const novaVerba = AppDataSource.manager.create(Verba, { numero, adicional, quantidadehoras, inicio, fim })
            await AppDataSource.manager.save(Verba, novaVerba)

            return res.json(novaVerba)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async todasVerbas(req: Request, res: Response){
        try {
            const verbas = await AppDataSource.manager.find(Verba, {
                relations: {
                    lancamentos: true,
                },
                order: {
                    numero: "ASC"
                }
            })
            return res.json(verbas)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }  
    }

    async getVerba(req: Request, res: Response){
        const { numero } = req.params

        try {
            const verbas = await AppDataSource.manager.find(Verba, {
                relations: {
                    lancamentos: true,
                },
                where: { numero: Number(numero) },
            })

            return res.json(verbas[0])
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
       
    }

    async atualizarVerba(req: Request, res: Response) {
        const { numero } = req.params
        const { adicional, quantidadehoras, inicio, fim } = req.body
        
        try {
            const novoCR = AppDataSource.manager.create(Verba,{ numero: Number(numero), adicional, quantidadehoras, inicio, fim })
            await AppDataSource.manager.save(Verba, novoCR)

            return res.json(novoCR)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async excluirVerba(req: Request, res: Response) {
        const { numero } = req.params

        try {
            const verba = await AppDataSource.manager.findOneBy(Verba, { numero: Number(numero) })
            await AppDataSource.manager.delete(Verba, verba)

            return res.json(verba)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }   

}