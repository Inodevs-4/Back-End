import { Request, Response } from "express";
import { AppDataSource } from "../data-source"
import { Colaborador } from "../entities/Colaborador";
import { Lancamento } from "../entities/Lancamento";

export default class LancamentoController {

    async salvarLancamento(req: Request, res: Response) {
        const { modalidade, data_inicio, data_fim, observacoes, colaborador, gestor, projeto } = req.body
        let { acionado, data_inicio2, data_fim2, } = req.body
        
        if (acionado !== "sim" && acionado !== "nao") {
            acionado = "nao"
        }

        if (acionado === "nao") {
            data_inicio2 = null
            data_fim2 = null
        }

        try {
            const novoLancamento = AppDataSource.manager.create(Lancamento, { modalidade, data_inicio, data_fim, data_inicio2, data_fim2, acionado, observacoes, colaborador, gestor, projeto })
            await AppDataSource.manager.save(Lancamento, novoLancamento)

            return res.json(novoLancamento)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async meusLancamentos(req: Request, res: Response) {
        try {
            const { id } = req.params

            const colaborador = await AppDataSource.manager.findOneBy(Colaborador, { matricula: Number(id) })

            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                take: 4,
                where: { colaborador },
                order: {
                    id: "DESC"
                }
            })
            return res.json(lancamentos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }

    async todosLancamentos(req: Request, res: Response){
        try {
            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                order: {
                    id: "DESC"
                }
            })
            return res.json(lancamentos)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }  
    }

    async getLancamento(req: Request, res: Response){
        const { id } = req.params

        try {
            const lancamentos = await AppDataSource.manager.find(Lancamento, {
                relations: {
                    colaborador: true,
                    projeto: true,
                    verbas: true,
                    gestor: true
                },
                where: { id: Number(id) },
            })

            return res.json(lancamentos[0])
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
       
    }

    async atualizarLancamento(req: Request, res: Response) {
        const { id } = req.params
        const { modalidade, data_inicio, data_fim, acionado, observacoes, colaborador, gestor, projeto, status } = req.body
        let { data_inicio2, data_fim2, } = req.body

        if (acionado === "nao") {
            data_inicio2 = null
            data_fim2 = null
        }

        try {
            const novoLancamento = AppDataSource.manager.create(Lancamento,{ id: Number(id), modalidade, data_inicio, data_fim, data_inicio2, data_fim2, observacoes, colaborador, gestor, projeto, status, acionado })
            await AppDataSource.manager.save(Lancamento, novoLancamento)

            return res.json(novoLancamento)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async excluirLancamento(req: Request, res: Response) {
        const { id } = req.params

        try {
            const lancamento = await AppDataSource.manager.findOneBy(Lancamento, { id: Number(id) })
            await AppDataSource.manager.delete(Lancamento, lancamento)

            return res.json(lancamento)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }

    }   

    async aprovarLancamento(req: Request, res: Response) {
        const { id } = req.params

        try {
            const lancamento = await AppDataSource.manager.findOneBy(Lancamento, { id: Number(id) })
            lancamento.status = "aprovado"
            await AppDataSource.manager.save(Lancamento, lancamento)

            return res.json(lancamento)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async reprovarLancamento(req: Request, res: Response) {
        const { id } = req.params

        try {
            const lancamento = await AppDataSource.manager.findOneBy(Lancamento, { id: Number(id) })
            lancamento.status = "reprovado"
            await AppDataSource.manager.save(Lancamento, lancamento)

            return res.json(lancamento)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}